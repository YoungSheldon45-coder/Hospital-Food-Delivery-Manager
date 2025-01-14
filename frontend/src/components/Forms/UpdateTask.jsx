import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateTask = ({ id, setUpdateTaskId }) => {
  const [taskData, setTaskData] = useState({
    deliveryStatus: "Pending",
    preparationStatus: "Pending",
    deliveryTimestamp: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the task data when the component mounts
  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        setTaskData({
          deliveryStatus: response.data.data.deliveryStatus,
          preparationStatus: response.data.data.preparationStatus,
          deliveryTimestamp: response.data.data.deliveryTimestamp,
        });
        setLoading(false);
      } catch (err) {
        setError("Error fetching task data");
        setLoading(false);
      }
    };
    fetchTaskData();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  // Handle form submission to update the task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}/status`, taskData);
      setUpdateTaskId(null);
      alert("Task updated successfully!");
    } catch (err) {
      setError("Error updating task");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Update Task</h2>
      <button onClick={()=> setUpdateTaskId(null)}>Close Form</button>
      <form onSubmit={handleSubmit}>
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
          <label>Delivery Timestamp</label>
          <input
            type="datetime-local"
            name="deliveryTimestamp"
            value={taskData.deliveryTimestamp}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default UpdateTask;
