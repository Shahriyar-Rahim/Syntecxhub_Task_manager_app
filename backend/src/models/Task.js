import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  // New Fields
  category: { 
    type: String, 
    enum: ['Work', 'Personal', 'Urgent', 'Study', 'Others'], 
    default: 'Personal' 
  },
  reminderAt: { type: Date }, // When the user wants to be reminded
  isNotified: { type: Boolean, default: false }, // Prevent double-triggering
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);