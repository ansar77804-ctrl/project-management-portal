const Task = require("../models/Task");

const allowedStatuses = ["Pending", "In Progress", "Completed"];

const getTasks = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, sortBy = "created_at", order = "desc" } = req.query;
    let query = { userId: req.userId };

    // Add search filter if provided
    if (search && search.trim()) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Calculate pagination
    const pageNum = Math.max(1, parseInt(page));
    const pageSize = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * pageSize;

    // Sort order
    const sortOrder = order === "asc" ? 1 : -1;
    const sortObj = { [sortBy]: sortOrder };

    // Get total count for pagination
    const total = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(pageSize);

    res.json({
      tasks,
      pagination: {
        total,
        page: pageNum,
        limit: pageSize,
        pages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!description || description.trim().length < 20) {
      return res
        .status(400)
        .json({ message: "Description must be at least 20 characters" });
    }

    if (status && !["Pending", "In Progress"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Status must be Pending or In Progress" });
    }

    const task = await Task.create({ userId: req.userId, title, description, status });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid task status" });
    }

    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

const getStatistics = async (req, res) => {
  try {
    const query = { userId: req.userId };
    const total = await Task.countDocuments(query);
    const pending = await Task.countDocuments({ ...query, status: "Pending" });
    const inProgress = await Task.countDocuments({ ...query, status: "In Progress" });
    const completed = await Task.countDocuments({ ...query, status: "Completed" });

    res.json({
      total,
      pending,
      inProgress,
      completed,
      completionPercentage: total > 0 ? Math.round((completed / total) * 100) : 0
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch statistics" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
  getStatistics
};
