import React, { useState } from "react";

const RegisterForm = ({ setIsRegistered }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    contactNumber: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        setMessage("Registration successful!");
        setIsRegistered(true);
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "",
          contactNumber: "",
        });
      } else {
        setMessage(result.message || "Registration failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="">Select Role</option>
            <option value="manager">Manager</option>
            <option value="pantry_staff">Pantry Staff</option>
            <option value="delivery_personnel">Delivery Personnel</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Register
        </button>
        <a
          href="#"
          onClick={() => setIsRegistered(true)}
          style={styles.link}
        >
          Already a User?
        </a>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    width: "100%",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
  },
  heading: {
    textAlign: "center",
    color: "#333333",
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#555555",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #cccccc",
    fontSize: "14px",
    color: "#333333",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #cccccc",
    fontSize: "14px",
    color: "#333333",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  link: {
    display: "block",
    textAlign: "center",
    marginTop: "10px",
    color: "#007BFF",
    textDecoration: "none",
    fontSize: "14px",
    cursor: "pointer",
  },
  message: {
    marginTop: "20px",
    textAlign: "center",
    color: "#007BFF",
    fontSize: "14px",
  },
};

export default RegisterForm;
