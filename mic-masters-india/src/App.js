import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme, useMediaQuery, Fab } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { Analytics } from "@vercel/analytics/react";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import AboutContest from "./components/AboutContest/AboutContest";
import AboutBrand from "./components/AboutBrand/AboutBrand";
import Gallery from "./components/Gallery/Gallery";
import RegistrationModal from "./components/RegistrationModal/RegistrationModal";
import RegistrationsList from "./components/RegistrationsList/RegistrationsList";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Footer from "./components/Footer/Footer";

import "./App.css";

// NOTE: The actual registration -> payment flow lives entirely inside
// RegistrationModal (form) -> PaymentModal (QR + screenshot upload), which
// talks directly to the backend. There used to be a second, disconnected
// copy of this flow here in App.js (with a hardcoded localhost:5000 URL
// that would always fail in production) - that dead code has been removed.

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  return (
    <Router>
      <div style={{ cursor: "auto" }}>
        <Routes>
          {/* Public site */}
          <Route
            path="/"
            element={
              <div className="App">
                <Header onRegisterClick={() => setRegisterModalOpen(true)} />
                <Hero
                  onRegisterClick={() => setRegisterModalOpen(true)}
                  isMobile={isMobile}
                />
                <AboutContest onRegisterClick={() => setRegisterModalOpen(true)} />
                <AboutBrand />
                <Gallery />
                <Footer onRegisterClick={() => setRegisterModalOpen(true)} />

                {/* Floating Register Button for Mobile */}
                {isMobile && (
                  <Fab
                    color="primary"
                    aria-label="register"
                    className="fixed-register-button"
                    onClick={() => setRegisterModalOpen(true)}
                    sx={{ cursor: "pointer" }}
                  >
                    <PaymentIcon className="payment-icon" />
                  </Fab>
                )}

                {/* Registration form -> opens PaymentModal internally on submit */}
                <RegistrationModal
                  open={registerModalOpen}
                  onClose={() => setRegisterModalOpen(false)}
                />

                <Analytics />
              </div>
            }
          />

          {/* Admin Panel - real auth now lives on the backend (JWT + bcrypt),
              AdminLogin just calls the login API and RegistrationsList checks
              the session itself, so there's no client-side "isAdminLoggedIn"
              flag to fake. */}
          <Route
            path="/admin"
            element={<AdminGate />}
          />
        </Routes>
      </div>
    </Router>
  );
}

// Small gate component: shows AdminLogin until a valid session cookie exists,
// then shows the registrations list. Session check happens against the
// backend (GET /api/admin/session), not in client state, so it survives
// page refreshes and can't be spoofed by editing JS state.
function AdminGate() {
  const [checking, setChecking] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.add("admin-cursor");
    return () => document.body.classList.remove("admin-cursor");
  }, []);

  React.useEffect(() => {
    const API_BASE_URL = require("./config").default;
    fetch(`${API_BASE_URL}/api/admin/session`, { credentials: "include" })
      .then((res) => {
        setIsLoggedIn(res.ok);
        setChecking(false);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setChecking(false);
      });
  }, []);

  if (checking) return null;

  return isLoggedIn ? (
    <RegistrationsList />
  ) : (
    <AdminLogin onLogin={() => setIsLoggedIn(true)} />
  );
}

export default App;
