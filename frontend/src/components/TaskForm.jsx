import React, { useState } from 'react';
import { useCreateTaskMutation } from '../features/tasks/tasksApiSlice';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Personal');
  const [reminderAt, setReminderAt] = useState('');
  const [createTask] = useCreateTaskMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, category, reminderAt }).unwrap();
      // Reset State
      setTitle('');
      setCategory('Personal');
      setReminderAt('');
    } catch (err) {
      console.error("Failed to save the task", err);
    }
  };

  return (
    <form onSubmit={handleAdd} className="flex flex-wrap gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <input 
        type="text" value={title} onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title..." className="flex-1 min-w-[200px] p-3 border rounded-xl" 
      />
      
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-3 border rounded-xl">
        <option>Work</option>
        <option>Personal</option>
        <option>Urgent</option>
        <option>Study</option>
      </select>

      <input 
        type="datetime-local" value={reminderAt} onChange={(e) => setReminderAt(e.target.value)}
        className="p-3 border rounded-xl" 
      />

      <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700">
        Add Task
      </button>
    </form>
  );
};