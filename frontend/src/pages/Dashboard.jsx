import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
import { Plus } from "lucide-react";
import { useGetTasksQuery } from "../features/tasks/tasksApiSlice";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import NotificationController from "../components/NotificationController";

const socket = io("https://syntecxhub-task-manager-app-backend.vercel.app", { withCredentials: true });

const Dashboard = () => {
  const [editTask, setEditTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: tasks, isLoading } = useGetTasksQuery();
  const userInfo = useSelector((state) => state.auth);

  useEffect(() => {
    if (editTask) {
      setIsModalOpen(true);
    }
  }, [editTask]);

  const closeForm = () => {
    setIsModalOpen(false);
    setEditTask(null);
  };

  useEffect(() => {
    const userId = userInfo?.user?._id;

    if (userId) {
      const emitJoin = () => {
        socket.emit("join", userId);
      };

      if (socket.connected) {
        emitJoin();
      } else {
        socket.on("connect", emitJoin);
      }

      socket.on("task_reminder", (data) => {
        toast.success(`Reminder: ${data.title}`);
        new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3")
          .play()
          .catch(() => {});
      });

      return () => {
        socket.off("connect", emitJoin);
        socket.off("task_reminder");
      };
    }
  }, [userInfo]);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-blue-600 font-bold">Syncing your workspace...</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-12 pb-24 md:pb-12">
      <Toaster position="top-right" />
      <NotificationController />
      
      <header className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Workspace</h1>
        <p className="text-gray-500">Manage your goals and daily targets</p>
      </header>

      {/* PC View: Inline Form */}
      <div className="hidden md:block mb-10">
        <TaskForm editTask={editTask} setEditTask={closeForm} />
      </div>

      {/* Mobile Modal View */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm md:hidden">
          <div className="w-full max-h-[90vh] overflow-y-auto">
            <TaskForm editTask={editTask} setEditTask={closeForm} isModal={true} closeModal={closeForm} />
          </div>
        </div>
      )}

      {/* Task List Header */}
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-lg md:text-xl font-black text-gray-800">
          Your Tasks <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">{tasks?.length || 0}</span>
        </h2>
      </div>

      {/* --- FIXED SECTION: MAPPING TASKS --- */}
      {tasks && tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onEdit={() => setEditTask(task)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">No tasks found. Start by adding one!</p>
        </div>
      )}

      {/* Mobile Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl z-40 active:scale-95 transition-transform"
      >
        <Plus size={28} />
      </button>
    </div>
  );
};

export default Dashboard;