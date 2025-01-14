import mongoose, { Schema, model } from "mongoose";

const dietChartSchema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    morningMeal: { type: String, required: true },
    eveningMeal: { type: String, required: true },
    nightMeal: { type: String, required: true },
    specialInstructions: { type: String, default: "" },
  },
  { timestamps: true }
);

const DietChart = mongoose.models.DietChart || model("DietChart", dietChartSchema);


export default DietChart;

