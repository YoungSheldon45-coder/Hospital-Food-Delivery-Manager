// File: backend/models/Patient.js

import mongoose, { Schema, model } from "mongoose";

const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    roomNumber: { type: String, required: true },
    bedNumber: { type: String, required: true },
    floorNumber: { type: String, required: true },
    contactInformation: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    diseases: { type: [String], default: [] },
    allergies: { type: [String], default: [] },
    others: { type: Object, default: {} },
  },
  { timestamps: true }
);

// Correctly name the model to align with the schema
const Patient = mongoose.models.Patient ||  model("Patient", patientSchema);

export default Patient;

