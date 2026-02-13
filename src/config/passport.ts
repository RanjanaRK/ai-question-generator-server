import passport from "passport";
import { prisma } from "../lib/prisma";

passport.serializeUser((user: any, done) => {
  if (!user || !user.id) {
    return done(new Error("User id missing during serialization"));
  }

  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return done(new Error("User not found during deserialization"));
    }

    done(null, user);
  } catch (error) {
    done(error);
  }
});
