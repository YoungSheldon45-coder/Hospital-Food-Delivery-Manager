import { Router } from "express";
const router = Router();
import { getDietCharts, createDietChart, updateDietChart, deleteDietChart, getDietChartForPatient } from "../api/dietChartController.js";

// Protected routes (Accessible by Manager and Pantry Staff)
router.get("/", getDietCharts); // Get all diet charts
router.post("/", createDietChart);             // Create a new diet chart
router.put("/:id", updateDietChart);           // Update an existing diet chart
router.delete("/:id", deleteDietChart);        // Delete a diet chart
router.get("/:patientId", getDietChartForPatient);

export default router;
