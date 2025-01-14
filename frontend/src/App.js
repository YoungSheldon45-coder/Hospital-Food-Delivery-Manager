import React, { useState } from "react";
import RegisterForm from "./components/Forms/RegisterForm";
import LoginForm from "./components/Forms/LoginForm";
import HospitalFoodManagerDashboard from "./pages/HospitalFoodManagerDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showWelcomeCard, setShowWelcomeCard] = useState(false);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      minHeight: "100vh",
      backgroundColor: "#f9f9f9",
      fontFamily: "Arial, sans-serif",
    },
    welcomeCard: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      padding: "20px",
      textAlign: "center",
      zIndex: 1000,
      maxWidth: "400px",
      width: "100%",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 999,
    },
    heading: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#333",
      marginBottom: "10px",
    },
    details: {
      fontSize: "16px",
      color: "#555",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      color: "#fff",
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    dashboardButton: {
      padding: "10px 20px",
      marginTop: "10px",
      fontSize: "16px",
      color: "#fff",
      backgroundColor: "#28a745",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    closeButton: {
      marginTop: "20px",
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
  };

  return (
    <div style={styles.container}>
      {!loggedInUser ? (
        isRegistered ? (
          <LoginForm
            setLoggedInUser={setLoggedInUser}
            setIsRegistered={setIsRegistered}
          />
        ) : (
          <RegisterForm setIsRegistered={setIsRegistered} />
        )
      ) : (
        <>
          <button
            style={styles.dashboardButton}
            onClick={() => setShowWelcomeCard(true)}
          >
            View User Info and Logout
          </button>
          <br/>
          <br/>
          {loggedInUser.role === "manager" ||
          loggedInUser.role === "pantry_staff" ? (
            <HospitalFoodManagerDashboard loggedInUser={loggedInUser.role} />
          ) : (
            <DeliveryDashboard />
          )}
        </>
      )}
      {showWelcomeCard && (
        <>
          <div style={styles.overlay} onClick={() => setShowWelcomeCard(false)} />
          <div style={styles.welcomeCard}>
            <h2 style={styles.heading}>Welcome, {loggedInUser.name}!</h2>
            <p style={styles.details}>
              <strong>Role:</strong> {loggedInUser.role} <br />
              <strong>Contact:</strong> {loggedInUser.contactNumber}
            </p>
            <button
              style={styles.button}
              onClick={() => {
                setLoggedInUser(null);
                setShowWelcomeCard(false);
              }}
            >
              Logout
            </button>
            <button
              style={styles.closeButton}
              onClick={() => setShowWelcomeCard(false)}
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
