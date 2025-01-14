// src/components/CreateDietChart.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateDietChart = () => {
  const [dietChartData, setDietChartData] = useState({
    patientId: "",
    morningMeal: "",
    eveningMeal: "",
    nightMeal: "",
    specialInstructions: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDietChartData({ ...dietChartData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/diet-charts", dietChartData);
      navigate("/"); // Redirect to the dashboard
    } catch (error) {
      console.error("Error creating diet chart:", error);
    }
  };

  return (
    <div>
      <h2>Create Diet Chart</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="patientId"
          placeholder="Patient ID"
          value={dietChartData.patientId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="morningMeal"
          placeholder="Morning Meal"
          value={dietChartData.morningMeal}
          onChange={handleChange}
        />
        <input
          type="text"
          name="eveningMeal"
          placeholder="Evening Meal"
          value={dietChartData.eveningMeal}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nightMeal"
          placeholder="Night Meal"
          value={dietChartData.nightMeal}
          onChange={handleChange}
        />
        <textarea
          name="specialInstructions"
          placeholder="Special Instructions"
          value={dietChartData.specialInstructions}
          onChange={handleChange}
        />
        <button type="submit">Create Diet Chart</button>
      </form>
    </div>
  );
};

export default CreateDietChart;
