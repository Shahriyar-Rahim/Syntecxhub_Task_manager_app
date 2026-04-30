import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Added Import
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../features/tasks/tasksApiSlice";
import { Plus, Save, X, Calendar, Tag, AlignLeft } from "lucide-react";
import toast from "react-hot-toast";

const TaskForm = ({ editTask, setEditTask, isModal, closeModal }) => {
  // Access userInfo from Redux state
  const userInfo = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Personal",
    reminderAt: "",
  });

  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  // Synchronize form with editTask prop
  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title,
        description: editTask.description || "",
        category: editTask.category,
        reminderAt: editTask.reminderAt
          ? new Date(editTask.reminderAt).toISOString().slice(0, 16)
          : "",
      });
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Get User ID from Redux
    const userId = userInfo?.user?._id;

    // 2. Guard Clause: Prevent submission if no user is found
    if (!userId) {
      toast.error("You must be logged in to manage tasks");
      return;
    }

    try {
      const taskPayload = {
        ...formData,
        userId: userId, // Pass the verified ID
        reminderAt: formData.reminderAt ? new Date(formData.reminderAt).toISOString() : null,
      };

      if (editTask) {
        await updateTask({ id: editTask._id, ...taskPayload }).unwrap();
        toast.success("Task updated successfully");
      } else {
        await createTask(taskPayload).unwrap();
        toast.success("Task added to your list");
      }

      handleCleanup();
    } catch (err) {
      toast.error("Failed to process task");
      console.error(err);
    }
  };

  const handleCleanup = () => {
    setEditTask(null);
    if (closeModal) closeModal();
    setFormData({ title: "", description: "", category: "Personal", reminderAt: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 animate-in fade-in zoom-in-95 duration-300 ${
        isModal ? "shadow-2xl w-full max-w-lg mx-auto" : "shadow-xl shadow-gray-100 mb-10"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${editTask ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"}`}>
            {editTask ? <Save size={20} /> : <Plus size={20} />}
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {editTask ? "Edit Task" : "New Task"}
          </h2>
        </div>
        {isModal && (
          <button 
            type="button" 
            onClick={handleCleanup} 
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition"
          >
            <X size={24} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Task Title"
            className="w-full p-4 pl-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition text-base"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-4 pl-10 border border-gray-200 rounded-2xl bg-white outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm"
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Urgent</option>
              <option>Study</option>
            </select>
          </div>

          <div className="flex-1 relative">
            <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="datetime-local"
              value={formData.reminderAt}
              onChange={(e) => setFormData({ ...formData, reminderAt: e.target.value })}
              className="w-full p-4 pl-10 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        <div className="relative">
          <AlignLeft size={16} className="absolute left-4 top-5 text-gray-400" />
          <textarea
            placeholder="Description..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-4 pl-10 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end mt-2">
        <button
          type="button"
          onClick={handleCleanup}
          className="px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition flex items-center justify-center gap-2"
        >
          {isModal ? "Dismiss" : <><X size={18} /> Cancel</>}
        </button>
        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className={`${
            editTask ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-600 hover:bg-blue-700"
          } text-white px-8 py-4 rounded-2xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-100 disabled:opacity-70`}
        >
          {editTask ? <><Save size={18} /> Update</> : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;