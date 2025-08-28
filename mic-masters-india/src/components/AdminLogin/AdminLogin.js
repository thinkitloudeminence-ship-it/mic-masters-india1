import React, { useState } from "react";
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
    }
  };

  return (
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
  );
};

export default AdminLogin;
