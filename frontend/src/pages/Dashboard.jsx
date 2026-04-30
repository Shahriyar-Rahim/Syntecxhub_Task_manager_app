import React, { useState } from 'react';
import { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } from '../features/tasks/tasksApiSlice';
import { Plus, Trash2, CheckCircle, Circle, Clock } from 'lucide-react';

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const { data: tasks, isLoading } = useGetTasksQuery();
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createTask({ title });
    setTitle('');
  };

  if (isLoading) return <div className="flex justify-center p-20 text-blue-600 font-bold">Loading your workflow...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Productivity</h1>
        <p className="text-gray-500">Manage your daily tasks and stay organized.</p>
      </header>

      {/* Quick Add Form */}
      <form onSubmit={handleAdd} className="mb-8 flex gap-2">
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?" 
          className="flex-1 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition"
        />
        <button className="bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-200">
          <Plus size={20} /> Add
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-4">
        {tasks?.length === 0 && <div className="text-center py-10 text-gray-400 italic">No tasks found. Relax or add a new one!</div>}
        
        {tasks?.map((task) => (
          <div key={task._id} className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => updateTask({ id: task._id, status: task.status === 'completed' ? 'pending' : 'completed' })}
                className="text-gray-400 hover:text-blue-600 transition"
              >
                {task.status === 'completed' ? <CheckCircle className="text-green-500" /> : <Circle />}
              </button>
              <div>
                <h3 className={`font-semibold text-gray-800 ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
                  {task.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                  <Clock size={12} /> {new Date(task.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <button 
              onClick={() => deleteTask(task._id)}
              className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;