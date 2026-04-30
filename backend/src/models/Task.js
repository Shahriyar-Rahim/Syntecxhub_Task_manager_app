import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ["Work", "Personal", "Urgent", "Study"] },
    reminderAt: { type: Date }, // Ensure this is a Date type
    isNotified: { type: Boolean, default: false },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt
  },
);

export default mongoose.model("Task", taskSchema);
