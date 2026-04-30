import Task from '../models/Task.js';

// Example: controllers/taskController.js
export const getTasks = async (req, res) => {
  try {
    // Filter tasks by the specific user ID
    const tasks = await Task.find({ user: req.user._id }); 
    
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, category, reminderAt } = req.body;
    
    const task = await Task.create({ 
      user: req.user._id, 
      title, 
      description, 
      category, 
      reminderAt 
    });

    const io = req.app.get('socketio'); 

    if (io) {
      io.to(req.user._id.toString()).emit('notification', {
        type: 'TASK_CREATED',
        message: `New task added: ${title}`,
        task
      });
    }

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// In your taskController.js
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { ...req.body },
      { 
        returnDocument: 'after', // Replaces new: true
        runValidators: true 
      }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task && task.user.toString() === req.user._id.toString()) {
    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};