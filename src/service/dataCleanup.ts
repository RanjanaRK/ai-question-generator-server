import cron from "node-cron";
import { deleteExpiredMcqsService } from "./deleteExpiresService";

export const dataCleanup = cron.schedule("0 0 */5 * *", async () => {
  console.log("Running cleanup job...");
  const deleted = await deleteExpiredMcqsService();
  console.log("Deleted MCQs:", deleted);
});
