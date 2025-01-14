import mongoose, { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    mealType: {
      type: String,
      enum: ["Morning", "Evening", "Night"],
      required: true,
    },
    assignedStaff: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    preparationStatus: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    deliveryStatus: {
      type: String,
      enum: ["Pending", "In Transit", "Delivered"],
      default: "Pending",
    },
    deliveryPersonnel: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    deliveryTimestamp: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task ||  model("Task", taskSchema);

export default Task;
