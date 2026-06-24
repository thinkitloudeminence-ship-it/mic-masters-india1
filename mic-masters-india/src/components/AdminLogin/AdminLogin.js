import React, { useState } from "react";
<<<<<<< HEAD
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import API_BASE_URL from "../../config";

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // needed to receive/send the httpOnly session cookie
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      onLogin();
    } catch (err) {
      console.error("❌ Admin login error:", err);
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
=======
import { Container, TextField, Button, Typography, Paper, Box } from "@mui/material";

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔑 Hardcoded Admin Credentials (change as needed)
    const ADMIN_USER = "admin";
    const ADMIN_PASS = "micmaster123";

    if (
      credentials.username === ADMIN_USER &&
      credentials.password === ADMIN_PASS
    ) {
      onLogin(); // login success -> call App.js setter
    } else {
      setError("Invalid username or password ❌");
>>>>>>> 79ba03530b485e4de951769054c6cd23c386abf5
    }
  };

  return (
<<<<<<< HEAD
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: "25px",
            textAlign: "center",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            color: "#fff",
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              bgcolor: "rgba(255,255,255,0.2)",
              mb: 2,
              width: 70,
              height: 70,
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 35, color: "#fff" }} />
          </Avatar>

          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 1 }}>
            Admin Login
          </Typography>
          <Typography variant="body2" sx={{ mb: 4, opacity: 0.8 }}>
            Secure access to the Admin Dashboard
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
              sx={{
                mb: 3,
                input: { color: "#fff" },
                label: { color: "#ddd" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                  "&:hover fieldset": { borderColor: "#fff" },
                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              sx={{
                mb: 2,
                input: { color: "#fff" },
                label: { color: "#ddd" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.93)" },
                  "&:hover fieldset": { borderColor: "#fff" },
                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                },
              }}
            />

            {error && (
              <Typography sx={{ color: "#ff8a8a", mb: 2, fontSize: 14 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : null}
              sx={{
                background: "linear-gradient(90deg, #ff8a00, #e52e71)",
                fontWeight: "bold",
                py: 1.3,
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "17px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                "&:hover": {
                  background: "linear-gradient(90deg, #e52e71, #ff8a00)",
                },
              }}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
=======
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          🔐 Admin Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            margin="normal"
            required
          />

          {error && (
            <Typography color="error" sx={{ mt: 1, mb: 1 }}>
              {error}
            </Typography>
          )}

          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
>>>>>>> 79ba03530b485e4de951769054c6cd23c386abf5
  );
};

export default AdminLogin;
