// File: backend/server.js

import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv"
dotenv.config();
import cors from "cors";
// Import body-parser as a default package and destructure json and urlencoded from it
import bodyParser from "body-parser";

import authRoutes from "../backend/routes/authRoutes.js";
import dietChartRoutes from "../backend/routes/dietChartRoutes.js";
import patientRoutes from "../backend/routes/patientRoutes.js";
import taskRoutes from "../backend/routes/taskRoutes.js";

console.log(process.env.PORT);
console.log(process.env.MONGO_URI)



const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Use bodyParser's json middleware
app.use(bodyParser.urlencoded({ extended: true })); // Use bodyParser's urlencoded middleware

// Routes
app.use("/api/auth", authRoutes); // Corrected to /api/auth for authRoutes
app.use("/api/patients", patientRoutes); // Corrected to /api/patients for patientRoutes
app.use("/api/diet-charts", dietChartRoutes);
app.use("/api/tasks", taskRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
