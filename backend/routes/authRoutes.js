import { Router } from "express";
const router = Router();
import { registerUser } from "../api/authController.js";
import { loginUser } from "../api/authController.js";
import { getUserProfile } from "../api/authController.js";

// Public routes
router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser);       // Login an existing user

// Protected routes
router.get("/profile", getUserProfile); // Get the logged-in user's profile

export default router;
