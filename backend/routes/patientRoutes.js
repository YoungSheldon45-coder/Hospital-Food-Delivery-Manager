// File: backend/routes/patientRoutes.js

import { Router } from "express";
const router = Router();
import {
  getPatients,
  createPatient,
  getPatientById,
  updatePatient,
  deletePatient
} from "../api/patientController.js";

// Routes
router.get("/", getPatients); // Get all patients
router.post("/", createPatient); // Create a new patient
router.get("/:id", getPatientById); // Get a single patient by ID
router.put("/:id", updatePatient); // Update a patient by ID
router.delete("/:id", deletePatient); // Delete a patient by ID

export default router;

