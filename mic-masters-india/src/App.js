import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme, useMediaQuery, Fab } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import AboutContest from "./components/AboutContest/AboutContest";
import AboutBrand from "./components/AboutBrand/AboutBrand";
import Gallery from "./components/Gallery/Gallery";
import RegistrationModal from "./components/RegistrationModal/RegistrationModal";
import PaymentModal from "./components/PaymentModal/PaymentModal";
import IdPassModal from "./components/IdPassModal/IdPassModal";
import RegistrationsList from "./components/RegistrationsList/RegistrationsList";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import CustomCursor from "./components/CustomCursor/CustomCursor";

import "./App.css";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // States
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [idPassModalOpen, setIdPassModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    education: "",
    interested: "",
    inquiry: "",
  });

  const [paymentProof, setPaymentProof] = useState(null);
  const [registrationId, setRegistrationId] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  // Registration submit (backend + open payment modal)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Registered Successfully!");
        console.log("Saved:", result);

        // Save generated ID
        setRegistrationId("MMI" + Date.now());

        // Close register modal and open payment modal
        setRegisterModalOpen(false);
        setPaymentModalOpen(true);
      } else {
        alert("❌ Error: " + result.message);
      }
    } catch (err) {
      console.error("❌ Network Error:", err);
      alert("❌ Network error while saving registration");
    }
  };

  // Upload payment proof
  const handlePaymentProofUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentProof(file);
    }
  };

  // Payment submit
  const handlePaymentSubmit = () => {
    setPaymentModalOpen(false);
    setIdPassModalOpen(true);
  };

  // Download ID Pass
  const handleDownloadIdPass = () => {
    alert("ID Pass downloaded successfully!");
    setIdPassModalOpen(false);
  };

  return (
    <Router>
      <Routes>
        {/* 👉 Normal user website */}
        <Route
          path="/"
          element={
            <div className="App">
              {/* 🎤 Custom cursor */}
              <CustomCursor />

              <Header onRegisterClick={() => setRegisterModalOpen(true)} />
              <Hero
                onRegisterClick={() => setRegisterModalOpen(true)}
                isMobile={isMobile}
              />
              <AboutContest />
              <AboutBrand />
              <Gallery />

              {/* Footer */}
              <div className="footer">
                <div className="container">
                  <p>
                    © {new Date().getFullYear()} Mic Masters India. All rights
                    reserved.
                  </p>
                </div>
              </div>

              {/* Floating Register Button for Mobile */}
              {isMobile && (
                <Fab
                  color="primary"
                  aria-label="register"
                  className="fixed-register-button"
                  onClick={() => setRegisterModalOpen(true)}
                >
                  <PaymentIcon className="payment-icon" />
                </Fab>
              )}

              {/* Modals */}
              <RegistrationModal
                open={registerModalOpen}
                onClose={() => setRegisterModalOpen(false)}
                registrationData={registrationData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />

              <PaymentModal
                open={paymentModalOpen}
                onClose={() => setPaymentModalOpen(false)}
                paymentProof={paymentProof}
                handlePaymentProofUpload={handlePaymentProofUpload}
                handlePaymentSubmit={handlePaymentSubmit}
              />

              <IdPassModal
                open={idPassModalOpen}
                onClose={() => setIdPassModalOpen(false)}
                registrationData={registrationData}
                registrationId={registrationId}
                handleDownloadIdPass={handleDownloadIdPass}
              />
            </div>
          }
        />

        {/* 👉 Admin Panel */}
        <Route
          path="/admin"
          element={
            isAdminLoggedIn ? (
              <RegistrationsList />
            ) : (
              <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
