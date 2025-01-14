// File: backend/controllers/patientController.js

import Patient from "../models/Patient.js";
import { sendSuccessResponse, sendErrorResponse } from "../utils/responseHelper.js";

// Get all patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find(); // Use Patient.find() here
    sendSuccessResponse(res, 200, "Patients retrieved successfully", patients);
  } catch (error) {
    sendErrorResponse(res, 500, "Error retrieving patients", error.message);
  }
};

// Get a single patient by ID
export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id); // Fetch patient by ID

    if (!patient) {
      return sendErrorResponse(res, 404, "Patient not found");
    }

    sendSuccessResponse(res, 200, "Patient retrieved successfully", patient);
  } catch (error) {
    sendErrorResponse(res, 500, "Error retrieving patient", error.message);
  }
};

// Create a new patient
export const createPatient = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      roomNumber,
      bedNumber,
      floorNumber,
      contactInformation,
      emergencyContact,
      diseases,
      allergies,
      others,
    } = req.body;

    const patient = new Patient({
      name,
      age,
      gender,
      roomNumber,
      bedNumber,
      floorNumber,
      contactInformation,
      emergencyContact,
      diseases,
      allergies,
      others,
    });

    const savedPatient = await patient.save();
    sendSuccessResponse(res, 201, "Patient created successfully", savedPatient);
  } catch (error) {
    sendErrorResponse(res, 400, "Error creating patient", error.message);
  }
};

// Update an existing patient
export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedPatient) {
      return sendErrorResponse(res, 404, "Patient not found");
    }

    sendSuccessResponse(res, 200, "Patient updated successfully", updatedPatient);
  } catch (error) {
    sendErrorResponse(res, 400, "Error updating patient", error.message);
  }
};

// Delete a patient
export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPatient = await Patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      return sendErrorResponse(res, 404, "Patient not found");
    }

    sendSuccessResponse(res, 200, "Patient deleted successfully", deletedPatient);
  } catch (error) {
    sendErrorResponse(res, 500, "Error deleting patient", error.message);
  }
};
