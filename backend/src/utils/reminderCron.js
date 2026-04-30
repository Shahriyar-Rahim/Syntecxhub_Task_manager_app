import cron from 'node-cron';
import Task from '../models/Task.js';

export const startReminderCron = (io) => {
  // Runs every minute to check for pending reminders
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    
    try {
      // Find tasks where reminder time has passed and notification hasn't been sent
      const tasksToNotify = await Task.find({
        reminderAt: { $lte: now },
        isNotified: false,
        status: 'pending'
      });

      if (tasksToNotify.length > 0) {
        for (const task of tasksToNotify) {
          // Send real-time event to the specific user's room
          io.to(task.user.toString()).emit('taskReminder', {
            title: task.title,
            category: task.category,
            id: task._id
          });

          // Mark as notified in the DB to prevent repeat alerts
          task.isNotified = true;
          await task.save();
          
          console.log(`🔔 Notification sent for task: ${task.title}`);
        }
      }
    } catch (error) {
      console.error('❌ Cron Job Error:', error);
    }
  });
};