const express = require("express");
const {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
  getStatistics
} = require("../controllers/taskController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/tasks", auth, getTasks);
router.get("/statistics", auth, getStatistics);
router.post("/tasks", auth, createTask);
router.put("/tasks/:id", auth, updateTaskStatus);
router.delete("/tasks/:id", auth, deleteTask);

module.exports = router;
