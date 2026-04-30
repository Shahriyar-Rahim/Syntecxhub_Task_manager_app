const categoryColors = {
  Urgent: 'bg-red-100 text-red-600',
  Work: 'bg-blue-100 text-blue-600',
  Study: 'bg-purple-100 text-purple-600',
  Personal: 'bg-green-100 text-green-600',
  Others: 'bg-gray-100 text-gray-600'
};

const TaskCard = ({ task, onDelete, onToggle }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
      <div className="flex items-center gap-3">
         {/* Category Badge */}
         <span className={`px-3 py-1 rounded-full text-xs font-bold ${categoryColors[task.category]}`}>
            {task.category}
         </span>
         <h3 className={task.status === 'completed' ? 'line-through' : ''}>{task.title}</h3>
      </div>
      {/* ... delete buttons etc ... */}
    </div>
  );
};