const mongoose = require('mongoose');
const Task = require('../models/taskModel');

exports.completeTask = async (req, res) => {
  try {
    const { taskId } = req.body;

    // Validate taskId format
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ success: false, message: 'Invalid task ID format' });
    }

    const objectId = new mongoose.Types.ObjectId(taskId);
    const task = await Task.findById(objectId);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    task.status = 'completed';
    await task.save();
    res.status(200).json({ success: true, message: 'Task completed successfully' });
  } catch (error) {
    console.error('Error completing task:', error);
    res.status(500).json({ success: false, message: 'Failed to complete task' });
  }
};