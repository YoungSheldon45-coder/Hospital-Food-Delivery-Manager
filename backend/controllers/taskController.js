// File: backend/controllers/taskController.js

import Task from "../models/Task.js";
import { sendSuccessResponse, sendErrorResponse } from "../utils/responseHelper.js";

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("patientId", "name roomNumber bedNumber") // Populates patient info
      .populate("assignedStaff", "name role") // Populates staff info
      .populate("deliveryPersonnel", "name role"); // Populates delivery personnel info

    sendSuccessResponse(res, 200, "Tasks retrieved successfully", tasks);
  } catch (error) {
    sendErrorResponse(res, 500, "Error retrieving tasks", error.message);
  }
};

// Create a new task
export const createTasks = async (req, res) => {
  try {
    const tasks = req.body;

    // Check if the request body is an array for bulk creation
    if (Array.isArray(tasks)) {
      const savedTasks = await Task.insertMany(tasks);
      sendSuccessResponse(res, 201, "Tasks created successfully", savedTasks);
    } else {
      // Single task creation
      const task = new Task(tasks);
      const savedTask = await task.save();
      sendSuccessResponse(res, 201, "Task created successfully", savedTask);
    }
  } catch (error) {
    sendErrorResponse(res, 400, "Error creating tasks", error.message);
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the task by its ID and delete it
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return sendErrorResponse(res, 404, 'Task not found');
    }

    return sendSuccessResponse(res, 200, 'Task deleted successfully');
  } catch (error) {
    console.error("Error deleting task:", error);
    return sendErrorResponse(res, 500, 'Server error', error);
  }
};

// Update the preparation and delivery status of a task
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryStatus, preparationStatus, deliveryTimestamp } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { 
        deliveryStatus,
        preparationStatus,
        deliveryTimestamp,
      },
      { new: true }
    );

    if (!updatedTask) {
      return sendErrorResponse(res, 404, "Task not found");
    }

    sendSuccessResponse(res, 200, "Task updated successfully", updatedTask);
  } catch (error) {
    sendErrorResponse(res, 400, "Error updating task", error.message);
  }
};


export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the task ID from the URL parameters

    // Fetch the task from the database by ID
    const task = await Task.findById(id).populate('patientId assignedStaff deliveryPersonnel'); // Use .populate() to get related data (optional)

    if (!task) {
      return sendErrorResponse(res, 404, "Task not found");
    }

    sendSuccessResponse(res, 200, "Task fetched successfully", task);
  } catch (error) {
    sendErrorResponse(res, 500, "Error fetching task", error.message);
  }
};