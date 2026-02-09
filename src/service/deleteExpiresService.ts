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

export const deleteExpiredQaService = async () => {
  return prisma.qaSet.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
};
export const deleteExpirePdfService = async () => {
  return prisma.pdfDocument.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
};
