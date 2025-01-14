import { Router } from "express";
const router = Router();
import { getTasks, createTasks, updateTaskStatus, getTaskById, deleteTask } from "../api/taskController.js";

// Protected routes (Accessible by Manager and Pantry Staff)
router.get("/",  getTasks);                   // Get all tasks
router.post("/",  createTasks);                               // Create a new task
router.put("/:id/status", updateTaskStatus); // Update the preparation and delivery status of a task
router.get("/:id", getTaskById); // Get a single task
router.delete("/:id", deleteTask);          // Delete a task by ID

export default router;
