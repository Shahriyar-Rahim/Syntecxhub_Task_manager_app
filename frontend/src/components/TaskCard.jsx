import React, { useState } from "react";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../features/tasks/tasksApiSlice";
import {
  Trash2,
  CheckCircle,
  Circle,
  Clock,
  Edit3,
  Calendar,
  Eye,
  X,
} from "lucide-react";

// 1. Define fallbacks to prevent "Cannot read properties of undefined"
const defaultCategoryColors = {
  Work: "bg-purple-100 text-purple-700",
  Personal: "bg-blue-100 text-blue-700",
  Urgent: "bg-red-100 text-red-700",
  Study: "bg-green-100 text-green-700",
  Other: "bg-gray-100 text-gray-700",
};

const TaskCard = ({ task, onEdit, categoryColors = defaultCategoryColors }) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  // 2. Safely get the color class
  const getColorClass = (category) => {
    return (
      categoryColors[category] || 
      defaultCategoryColors[category] || 
      defaultCategoryColors.Other
    );
  };

  const formattedDate = task.reminderAt
    ? new Date(task.reminderAt).toLocaleString("en-BD", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "No reminder";

  return (
    <>
      <div className="group flex flex-col p-4 md:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 md:gap-4">
            <button
              onClick={() =>
                updateTask({
                  id: task._id,
                  status: task.status === "completed" ? "pending" : "completed",
                })
              }
              className="mt-1 transition-transform transform active:scale-90"
            >
              {task.status === "completed" ? (
                <CheckCircle
                  className="text-green-500 fill-green-50"
                  size={24}
                />
              ) : (
                <Circle
                  className="text-gray-300 hover:text-blue-500"
                  size={24}
                />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${getColorClass(task.category)}`}
              >
                {task.category}
              </span>
              <h3
                className={`text-base md:text-lg font-bold text-gray-800 leading-tight mt-1 truncate ${task.status === "completed" ? "line-through text-gray-400" : ""}`}
              >
                {task.title}
              </h3>
            </div>
          </div>

          <div className="flex gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity ml-2">
            <button
              onClick={() => setIsViewOpen(true)}
              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition"
            >
              <Eye size={18} />
            </button>
            <button
              onClick={onEdit}
              className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition"
            >
              <Edit3 size={18} />
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {task.description && (
          <p className="text-gray-500 text-sm mb-4 ml-9 border-l-2 border-gray-50 pl-4 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 ml-9 mt-auto text-[11px] font-medium text-gray-400">
          <span className="flex items-center gap-1 whitespace-nowrap">
            <Clock size={14} className="text-gray-300" />{" "}
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
          {task.reminderAt && (
            <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-lg text-xs font-bold">
              <Calendar size={14} />
              {formattedDate}
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
      {isViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getColorClass(task.category)}`}
              >
                {task.category}
              </span>
              <button
                onClick={() => setIsViewOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">
              {task.title}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Description
                </label>
                <p className="text-gray-600 leading-relaxed mt-1 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  {task.description || "No description provided."}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">
                    Created
                  </label>
                  <p className="text-sm font-medium text-gray-700 mt-1">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">
                    Reminder
                  </label>
                  <p className="text-sm font-medium text-blue-600 mt-1">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;