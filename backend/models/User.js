import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["manager", "pantry_staff", "delivery_personnel"],
      required: true,
    },
    contactNumber: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Pre-save hook to format role data
userSchema.pre('save', function(next) {
  if (this.role) {
    this.role = this.role.toLowerCase();  // Ensure role is in lowercase
  }
  next();
});

// Prevent overwriting model if it already exists
const User = mongoose.models.User || model("User", userSchema);

export default User;
