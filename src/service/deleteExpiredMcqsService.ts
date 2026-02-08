import { prisma } from "../lib/prisma";

export const deleteExpiredMcqsService = async () => {
  return prisma.mcqSet.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
};
