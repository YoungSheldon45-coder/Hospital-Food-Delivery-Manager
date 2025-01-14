import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTask from "../components/Forms/CreateTask";
import UpdateTask from "../components/Forms/UpdateTask";
import "./styles/FoodManagerDashboard.css";

const DeliveryDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isCreateTaskForm, setIsCreateTaskForm] = useState(false);
  const [updateTaskId, setUpdateTaskId] = useState(null); // Track task ID to edit

  // Fetch tasks from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResponse = await axios.get("http://localhost:5000/api/tasks");
        setTasks(tasksResponse.data.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchData();
  }, [isCreateTaskForm]);

  // Function to delete a task with confirmation
  const deleteTask = async (id) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the task with ID: ${id}?`);

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        setTasks(tasks.filter((task) => task._id !== id)); // Remove deleted task from the state
        alert(`Task with ID: ${id} deleted successfully!`);
      } catch (error) {
        console.error("Error deleting task", error);
        alert(`Error deleting task with ID: ${id}`);
      }
    } else {
      console.log("Task deletion canceled.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Task Management Dashboard</h1>

      <div className="section">
        <h2>Meal Preparation & Delivery Tasks</h2>
        <br />
        <br />
        {isCreateTaskForm && <CreateTask />}

        {/* Task Cards */}
        <div className="task-cards-container">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h3>{task.patientId.name}</h3>
              <p><strong>Meal Type:</strong> {task.mealType}</p>
              <p><strong>Preparation Status:</strong> {task.preparationStatus}</p>
              <p><strong>Delivery Status:</strong> {task.deliveryStatus}</p>
              <div className="task-actions">
                <button onClick={() => setUpdateTaskId(task._id)}>Edit</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </div>
              {updateTaskId === task._id && (
                <UpdateTask
                  id={task._id}
                  setUpdateTaskId={setUpdateTaskId} // Pass function to close the modal
                />
              )}
            </div>
          ))}
        </div>
        <br />
        <br />
        <br />
        <h2>Meal Preparation & Delivery Tasks table</h2>
        {/* Task Table */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Meal Type</th>
              <th>Preparation Status</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.patientId.name}</td>
                <td>{task.mealType}</td>
                <td>{task.preparationStatus}</td>
                <td>{task.deliveryStatus}</td>
                <td className="patient-actions">
                  <button onClick={() => setUpdateTaskId(task._id)}>Edit</button>
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                  {updateTaskId === task._id && (
                    <UpdateTask
                      id={task._id}
                      setUpdateTaskId={setUpdateTaskId} // Pass function to close the modal
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
