import { prisma } from "../lib/prisma";

export const checkPlan = async (userId: string) => {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      plan: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.plan !== "PRO") {
    throw new Error("QA generation is available only for PRO users");
  }
};
