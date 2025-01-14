// src/components/AddPatient.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    gender: "",
    roomNumber: "",
    bedNumber: "",
    floorNumber: "",
    contactInformation: "",
    emergencyContact: "",
    diseases: [],
    allergies: [],
    others: {},
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/patients", patientData);
      navigate("/"); // Redirect to the dashboard
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  return (
    <div>
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          value={patientData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={patientData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={patientData.gender}
          onChange={handleChange}
        />
        <input
          type="text"
          name="roomNumber"
          placeholder="Room Number"
          value={patientData.roomNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bedNumber"
          placeholder="Bed Number"
          value={patientData.bedNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="floorNumber"
          placeholder="Floor Number"
          value={patientData.floorNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contactInformation"
          placeholder="Contact Information"
          value={patientData.contactInformation}
          onChange={handleChange}
        />
        <input
          type="text"
          name="emergencyContact"
          placeholder="Emergency Contact"
          value={patientData.emergencyContact}
          onChange={handleChange}
        />
        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
};

export default AddPatient;
