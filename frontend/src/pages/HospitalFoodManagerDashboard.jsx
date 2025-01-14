import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditPatientForm from "../components/Forms/EditPatient";
import AddPatient from "../components/Forms/AddPatient";
import CreateDietChart from "../components/Forms/CreateDietChart";
import UpdateDiet from "../components/Forms/UpdateDiet";
import UpdateTask from "../components/Forms/UpdateTask";
import CreateTask from "../components/Forms/CreateTask";
import "./styles/FoodManagerDashboard.css";

const HospitalFoodManagerDashboard = ({ loggedInUser }) => {
  const [patients, setPatients] = useState([]);
  const [dietCharts, setDietCharts] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [editPatientId, setEditPatientId] = useState(null); // Track the ID of the patient being edited
  const [isAddPatientForm, setIsAddPatientForm] = useState(false);
  const [isCreateDietForm, setIsCreateDietForm] = useState(false);
  const [isUpdateDietForm, setIsUpdateDietForm] = useState(null); // Store the ID of the diet chart being edited
  const [isCreateTaskForm, setIsCreateTaskForm] = useState(false);
  const [updateTaskId, setUpdateTaskId] = useState(null); // Track task ID to edit

  // Fetch patients, diet charts, and tasks from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsResponse = await axios.get(
          "http://localhost:5000/api/patients"
        );
        const dietChartsResponse = await axios.get(
          "http://localhost:5000/api/diet-charts"
        );
        const tasksResponse = await axios.get(
          "http://localhost:5000/api/tasks"
        );

        setPatients(patientsResponse.data.data);
        setDietCharts(dietChartsResponse.data.data);
        setTasks(tasksResponse.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [
    isAddPatientForm,
    isCreateDietForm,
    isUpdateDietForm,
    isCreateTaskForm,
    dietCharts,
    patients,
    tasks,
  ]);

  // Function to delete a patient with confirmation
  const deletePatient = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/patients/${id}`);
        setPatients(patients.filter((patient) => patient._id !== id)); // Remove deleted patient from the state
      } catch (error) {
        console.error("Error deleting patient", error);
      }
    } else {
      console.log("Patient deletion canceled.");
    }
  };

  // Function to delete a diet chart with confirmation
  const deleteDiet = async (id) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the diet chart with ID: ${id}?`
    );

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/diet-charts/${id}`);
        setDietCharts(dietCharts.filter((dietChart) => dietChart._id !== id)); // Remove deleted diet chart from the state
        alert(`Diet chart with ID: ${id} deleted successfully!`);
      } catch (error) {
        console.error("Error deleting diet chart", error);
      }
    } else {
      console.log("Diet chart deletion canceled.");
    }
  };

  // Function to delete a task with confirmation
  const deleteTask = async (id) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the task with ID: ${id}?`
    );

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
      <h1>Hospital Food Manager Dashboard</h1>

      <div className="section">
        <h2>Patients</h2>
        <br />
        {loggedInUser === "manager" && (
          <button onClick={() => setIsAddPatientForm(!isAddPatientForm)}>
            Add patient
          </button>
        )}
        <br />
        <br />
        {isAddPatientForm && <AddPatient />}
        <div className="patient-cards-container">
          {patients.map((patient) => (
            <div key={patient._id} className="patient-card">
              <h3>{patient.name || "No name available"}</h3>
              <p>Room: {patient.roomNumber}</p>
              <p>Age: {patient.age}</p>
              <p>
                <strong>Diseases:</strong> {patient.diseases.join(", ")}
              </p>
              <p>
                <strong>Allergies:</strong> {patient.allergies.join(", ")}
              </p>
              <p>
                <strong>Medical History:</strong>{" "}
                {patient.others.medicalHistory}
              </p>
              <p>
                <strong>Patient ID:</strong> {patient._id}
              </p>
              <div className="patient-actions">
                {loggedInUser === "manager" && (
                  <>
                    <button onClick={() => setEditPatientId(patient._id)}>
                      Edit
                    </button>
                    <button onClick={() => deletePatient(patient._id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>

              {/* Only render the modal for the patient being edited */}
              {editPatientId === patient._id && (
                <div className="modal">
                  <EditPatientForm
                    id={patient._id}
                    setEditPatientId={setEditPatientId}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Diet Charts</h2>
        <br />
        {loggedInUser === "manager" && (
          <button onClick={() => setIsCreateDietForm(!isCreateDietForm)}>
            Create Diet Chart
          </button>
        )}
        {isCreateDietForm && <CreateDietChart />}
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Morning Meal</th>
              <th>Evening Meal</th>
              <th>Night Meal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dietCharts.map((dietChart) => (
              <tr key={dietChart._id}>
                <td>{dietChart.patientId.name || "No name available"}</td>
                <td>{dietChart.morningMeal}</td>
                <td>{dietChart.eveningMeal}</td>
                <td>{dietChart.nightMeal}</td>
                <td className="patient-actions">
                  {loggedInUser === "manager" && (
                    <>
                      <button
                        onClick={() => setIsUpdateDietForm(dietChart._id)}
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteDiet(dietChart._id)}>
                        Delete
                      </button>
                    </>
                  )}

                  {isUpdateDietForm === dietChart._id && (
                    <UpdateDiet id={dietChart.patientId._id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Meal Preparation & Delivery Tasks</h2>
        <br />
        <button onClick={() => setIsCreateTaskForm(!isCreateTaskForm)}>
          Create Task
        </button>
        {isCreateTaskForm && <CreateTask />}
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
                  <button onClick={() => setUpdateTaskId(task._id)}>
                    Edit
                  </button>
                  {loggedInUser === "manager" && (
                    <button onClick={() => deleteTask(task._id)}>Delete</button>
                  )}

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

export default HospitalFoodManagerDashboard;
