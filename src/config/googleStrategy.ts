import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { prisma } from "../lib/prisma";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth env variables");
}

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const account = await prisma.oAuthAccount.findUnique({
          where: {
            provider_providerUserId: {
              provider: "google",
              providerUserId: profile.id,
            },
          },
          include: { user: true },
        });

        if (account) {
          return cb(null, account.user);
        }

        const email = profile.emails?.[0]?.value;

        if (!email) {
          return cb(new Error("Google account has no email"));
        }

        const user = await prisma.user.create({
          data: {
            email: email,
            name: profile.displayName,
          },
        });

        await prisma.oAuthAccount.create({
          data: {
            provider: "google",
            providerUserId: profile.id,
            userId: user.id,
          },
        });

        return cb(null, user);
      } catch (error) {
        return cb(error);
      }
    },
  ),
);
