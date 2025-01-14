// File: backend/controllers/dietChartController.js

import DietChart from "../models/DietChart.js";
import { sendSuccessResponse, sendErrorResponse } from "../utils/responseHelper.js";

// Get all diet charts
export const getDietCharts = async (req, res) => {
  try {
    const dietCharts = await DietChart.find() // Retrieve all diet charts
      .populate("patientId", "name"); // Populate patient name (from Patient model)

    sendSuccessResponse(res, 200, "Diet charts retrieved successfully", dietCharts);
  } catch (error) {
    sendErrorResponse(res, 500, "Error retrieving diet charts", error.message);
  }
};

// Create a new diet chart
export const createDietChart = async (req, res) => {
  try {
    const { patientId, morningMeal, eveningMeal, nightMeal, specialInstructions } = req.body;

    // Validate required fields
    if (!patientId || !morningMeal || !eveningMeal || !nightMeal) {
      return sendErrorResponse(res, 400, "Patient ID and meal details are required");
    }

    // Create a new diet chart
    const dietChart = new DietChart({
      patientId,
      morningMeal,
      eveningMeal,
      nightMeal,
      specialInstructions: specialInstructions || "", // Use empty string for default
    });

    const savedChart = await dietChart.save();
    sendSuccessResponse(res, 201, "Diet chart created successfully", savedChart);
  } catch (error) {
    sendErrorResponse(res, 400, "Error creating diet chart", error.message);
  }
};

// Update an existing diet chart
export const updateDietChart = async (req, res) => {
  try {
    const { id } = req.params; // Get the diet chart ID from URL params
    const { patientId, morningMeal, eveningMeal, nightMeal, specialInstructions } = req.body;

    // Validate required fields
    if (!patientId || !morningMeal || !eveningMeal || !nightMeal) {
      return sendErrorResponse(res, 400, "Patient ID and meal details are required");
    }

    // Find the diet chart by ID and update it
    const updatedDietChart = await DietChart.findByIdAndUpdate(
      id,
      {
        patientId,
        morningMeal,
        eveningMeal,
        nightMeal,
        specialInstructions: specialInstructions || "",
      },
      { new: true }
    );

    // If the diet chart doesn't exist, return a 404 error
    if (!updatedDietChart) {
      return sendErrorResponse(res, 404, "Diet chart not found");
    }

    // Send a success response with the updated diet chart
    sendSuccessResponse(res, 200, "Diet chart updated successfully", updatedDietChart);
  } catch (error) {
    sendErrorResponse(res, 400, "Error updating diet chart", error.message);
  }
};

// Delete an existing diet chart
export const deleteDietChart = async (req, res) => {
  try {
    const { id } = req.params; // Get the diet chart ID from URL params

    // Find the diet chart by ID and delete it
    const deletedDietChart = await DietChart.findByIdAndDelete(id);

    // If the diet chart doesn't exist, return a 404 error
    if (!deletedDietChart) {
      return sendErrorResponse(res, 404, "Diet chart not found");
    }

    // Send a success response with the deleted diet chart data
    sendSuccessResponse(res, 200, "Diet chart deleted successfully", deletedDietChart);
  } catch (error) {
    sendErrorResponse(res, 500, "Error deleting diet chart", error.message);
  }
};

// Get a single diet chart for a specific patient
export const getDietChartForPatient = async (req, res) => {
  try {
    const { patientId } = req.params;  // Patient ID is passed in the URL

    // Find the diet chart for the given patient
    const dietChart = await DietChart.findOne({ patientId })
      .populate("patientId", "name roomNumber bedNumber")  // Optionally populate patient data
      .exec();

    // If no diet chart found for this patient
    if (!dietChart) {
      return sendErrorResponse(res, 404, "Diet chart not found for this patient");
    }

    // Return the diet chart data
    sendSuccessResponse(res, 200, "Diet chart retrieved successfully", dietChart);
  } catch (error) {
    sendErrorResponse(res, 500, "Error retrieving diet chart", error.message);
  }
};
