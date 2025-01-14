import React, { useState } from "react";
import axios from "axios";

const CreateTask = () => {
  const [taskData, setTaskData] = useState({
    patientId: "Look at the patient's ID in the Patients section",
    mealType: "Morning",
    assignedStaff: "",
    preparationStatus: "Pending",
    deliveryStatus: "Pending",
    deliveryPersonnel: "",
    deliveryTimestamp: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/tasks", taskData);
      setSuccess("Task created successfully!");
      setError(""); // Reset error if the request is successful
    } catch (err) {
      setError("Error creating task");
      setSuccess(""); // Reset success message if an error occurs
    }
  };

  return (
    <div>
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}
        
        <div>
          <label>Patient ID</label>
          <input
            type="text"
            name="patientId"
            value={taskData.patientId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Meal Type</label>
          <select
            name="mealType"
            value={taskData.mealType}
            onChange={handleChange}
            required
          >
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>
        <div>
          <label>Assigned Staff</label>
          <input
            type="text"
            name="assignedStaff"
            value={taskData.assignedStaff}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Preparation Status</label>
          <select
            name="preparationStatus"
            value={taskData.preparationStatus}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Delivery Status</label>
          <select
            name="deliveryStatus"
            value={taskData.deliveryStatus}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <div>
          <label>Delivery Personnel</label>
          <input
            type="text"
            name="deliveryPersonnel"
            value={taskData.deliveryPersonnel}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Delivery Timestamp</label>
          <input
            type="datetime-local"
            name="deliveryTimestamp"
            value={taskData.deliveryTimestamp}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notes</label>
          <textarea
            name="notes"
            value={taskData.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
