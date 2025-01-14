// src/components/UpdateDiet.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateDiet = ({ id }) => {
  const [dietData, setDietData] = useState({
    morningMeal: "",
    eveningMeal: "",
    nightMeal: "",
    specialInstructions: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the diet chart data when the component mounts
  useEffect(() => {
    const fetchDietData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/diet-charts/${id}`);
        setDietData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching diet chart data");
        setLoading(false);
      }
    };
    fetchDietData();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDietData({ ...dietData, [name]: value });
  };

  // Handle form submission to update the diet chart
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/diet-charts/${id}`, dietData);
      alert("Diet chart updated successfully!");
    } catch (err) {
      setError("Error updating diet chart");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Update Diet Chart</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Morning Meal</label>
          <input
            type="text"
            name="morningMeal"
            value={dietData.morningMeal}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Evening Meal</label>
          <input
            type="text"
            name="eveningMeal"
            value={dietData.eveningMeal}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Night Meal</label>
          <input
            type="text"
            name="nightMeal"
            value={dietData.nightMeal}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Special Instructions</label>
          <textarea
            name="specialInstructions"
            value={dietData.specialInstructions}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Diet Chart</button>
      </form>
    </div>
  );
};

export default UpdateDiet;
