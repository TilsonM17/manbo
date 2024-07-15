const express = require("express");
const Task = require("../models/tasks");

const router = express.Router();

router.post("/tasks", async (req, res) => {
  const { title, description, status } = req.body;

  const newTask = new Task({title,description,status});

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task", message: error.message });
  }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find(); 
        res.status(200).json(tasks); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
