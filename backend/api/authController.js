// File: backend/controllers/authController.js

import User from "../models/User.js";
import bcrypt from 'bcryptjs';

const { hash, compare } = bcrypt;

import { sendSuccessResponse, sendErrorResponse } from "../utils/responseHelper.js";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, contactNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email }); // Use User.findOne() here
    if (existingUser) {
      return sendErrorResponse(res, 400, "User already exists");
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      contactNumber,
    });

    const savedUser = await newUser.save();
    sendSuccessResponse(res, 201, "User registered successfully", { id: savedUser._id, email: savedUser.email, name: savedUser.name });
  } catch (error) {
    sendErrorResponse(res, 500, "Error registering user", error.message);
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }); // Use User.findOne() here
    if (!user) {
      return sendErrorResponse(res, 400, "Invalid email or password");
    }

    // Compare passwords
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return sendErrorResponse(res, 400, "Invalid email or password");
    }

    sendSuccessResponse(res, 200, "Login successful", user);
  } catch (error) {
    sendErrorResponse(res, 500, "Error logging in", error.message);
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.body.id).select("-password"); // Use User.findById() here
    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }

    sendSuccessResponse(res, 200, "User profile retrieved successfully", user);
  } catch (error) {
    sendErrorResponse(res, 500, "Error retrieving user profile", error.message);
  }
};
