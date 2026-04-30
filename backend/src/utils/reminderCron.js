import cron from "node-cron";
import Task from "../models/Task.js";

export const startReminderCron = (io) => {
  // Runs every minute
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      // Find tasks that are due, not yet notified, and still pending
      const dueTasks = await Task.find({
        reminderAt: { $lte: now },
        isNotified: false,
        status: "pending",
      });

      if (dueTasks.length > 0) {
        dueTasks.forEach(async (task) => {
          const userId = task.user.toString();

          // Emitting specifically to the user's room
          io.to(userId).emit("task_reminder", {
            title: task.title,
            description: task.description,
          });

          task.isNotified = true;
          await task.save();
        });

        console.log(`🔔 Sent notifications for ${dueTasks.length} tasks.`);
      }
    } catch (error) {
      console.error("Cron Error:", error);
    }
  });
};
