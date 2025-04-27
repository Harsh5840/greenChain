const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/complete', taskController.completeTask);

module.exports = router;