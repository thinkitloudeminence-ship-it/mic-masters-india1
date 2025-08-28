import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from "@mui/material";

const RegistrationsList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch registrations from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/registrations")
      .then((res) => res.json())
      .then((data) => {
        setRegistrations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching registrations:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        Registered Participants
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Age</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Mobile</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>City</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registrations.length > 0 ? (
                registrations.map((reg) => (
                  <TableRow key={reg._id}>
                    <TableCell>{reg.fullName}</TableCell>
                    <TableCell>{reg.age}</TableCell>
                    <TableCell>{reg.email}</TableCell>
                    <TableCell>{reg.mobile}</TableCell>
                    <TableCell>{reg.city}</TableCell>
                    <TableCell>{reg.category}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No registrations found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default RegistrationsList;
