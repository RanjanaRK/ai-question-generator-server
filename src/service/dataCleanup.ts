import cron from "node-cron";
import { deleteExpiredMcqsService } from "./deleteExpiresService";

export const dataCleanup = cron.schedule("0 0 */7 * *", async () => {
  console.log("Cron triggered at:", new Date().toISOString());

  const deleted = await deleteExpiredMcqsService();

  console.log("Deleted MCQs:", deleted);
});
