import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/EditPatient.css"

const EditPatientForm = ({id, setEditPatientId}) => {

  const [patient, setPatient] = useState({
    name: "",
    roomNumber: "",
    age: "",
    diseases: [],
    allergies: [],
    others: {
      medicalHistory: "",
    },
  });
  const [loading, setLoading] = useState(true);

  // Fetch the patient data when the component is mounted
  useEffect(() => {
    console.log("ID: ",id)
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patients/${id}`);
        setPatient(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient data", error);
      }
    };

    fetchPatient();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "diseases" || name === "allergies") {
      setPatient({
        ...patient,
        [name]: value.split(",").map((item) => item.trim()),
      });
    } else {
      setPatient({
        ...patient,
        [name]: value,
      });
    }
  };

  // Handle form submission to update patient
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/patients/${id}`, patient);
      setEditPatientId(false); // Close the modal after submission
    } catch (error) {
      console.error("Error updating patient", error);
    }
  };

  // Loader while the patient data is being fetched
  if (loading) return <div>Loading...</div>;


  return (
    <div>
      <h2>Edit Patient</h2>
      <a style={{color: "red"}} href="#" onClick={()=> setEditPatientId(false)}>Close Form</a>

        <h3>Edit Patient Form</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={patient.name || "No name available"}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Room Number</label>
            <input
              type="text"
              name="roomNumber"
              value={patient.roomNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={patient.age}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Diseases</label>
            <input
              type="text"
              name="diseases"
              value={patient.diseases.join(", ")}
              onChange={handleChange}
              placeholder="Comma separated list"
              required
            />
          </div>
          <div>
            <label>Allergies</label>
            <input
              type="text"
              name="allergies"
              value={patient.allergies.join(", ")}
              onChange={handleChange}
              placeholder="Comma separated list"
              required
            />
          </div>
          <div>
            <label>Medical History</label>
            <textarea
              name="others.medicalHistory"
              value={patient.others.medicalHistory}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update Patient</button>
        </form>
    </div>
  );
};

export default EditPatientForm;
