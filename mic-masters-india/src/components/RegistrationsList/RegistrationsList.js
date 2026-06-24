import React, { useEffect, useState } from "react";
import {
  Container, Paper, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Button, Chip, Stack,
  CircularProgress, Box, Tooltip
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import API_BASE_URL from "../../config";

const statusColors = {
  pending: "warning",
  verified: "success",
  rejected: "error",
};

const RegistrationsList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState(null);
  const [stats, setStats] = useState({ total: 0, verified: 0, pending: 0, rejected: 0 });

  const fetchRegistrations = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/registrations`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch registrations");
        return res.json();
      })
      .then((data) => {
        setRegistrations(data);
        setStats({
          total: data.length,
          verified: data.filter((r) => r.paymentStatus === "verified").length,
          pending: data.filter((r) => r.paymentStatus === "pending" || !r.paymentStatus).length,
          rejected: data.filter((r) => r.paymentStatus === "rejected").length,
        });
      })
      .catch((err) => console.error("❌ Error fetching registrations:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleAction = async (id, action) => {
    setActioningId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/registrations/${id}/${action}`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed to ${action} registration`);
      const data = await res.json();

      setRegistrations((prev) =>
        prev.map((reg) => (reg._id === id ? data.data : reg))
      );
      // Recompute stats
      setRegistrations((prev) => {
        setStats({
          total: prev.length,
          verified: prev.filter((r) => r.paymentStatus === "verified").length,
          pending: prev.filter((r) => r.paymentStatus === "pending" || !r.paymentStatus).length,
          rejected: prev.filter((r) => r.paymentStatus === "rejected").length,
        });
        return prev;
      });
    } catch (err) {
      console.error(`❌ Error on ${action}:`, err);
      alert(`Failed to ${action} this registration. Please try again.`);
    } finally {
      setActioningId(null);
    }
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
    window.location.reload();
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          🎤 Mic Masters India — Admin Panel
        </Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>

      {/* Stats Bar */}
      <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: "wrap", gap: 2 }}>
        {[
          { label: "Total", value: stats.total, color: "#1976d2" },
          { label: "✅ Verified", value: stats.verified, color: "#2e7d32" },
          { label: "⏳ Pending", value: stats.pending, color: "#ed6c02" },
          { label: "❌ Rejected", value: stats.rejected, color: "#d32f2f" },
        ].map((s) => (
          <Paper key={s.label} elevation={3} sx={{ px: 3, py: 1.5, minWidth: 100, textAlign: "center", borderTop: `3px solid ${s.color}` }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: s.color }}>{s.value}</Typography>
            <Typography variant="caption" sx={{ color: "#888" }}>{s.label}</Typography>
          </Paper>
        ))}
      </Stack>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={5} sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Mobile</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Education</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Registered</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Payment Screenshot</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registrations.map((reg, index) => (
                <TableRow key={reg._id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "rgba(0,0,0,0.03)" } }}>
                  <TableCell sx={{ fontWeight: "bold", color: "#888" }}>{index + 1}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>{reg.fullName}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem" }}>{reg.email}</TableCell>
                  <TableCell>{reg.mobile}</TableCell>
                  <TableCell>{reg.category || "-"}</TableCell>
                  <TableCell>{reg.education || "-"}</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", color: "#888", whiteSpace: "nowrap" }}>
                    {reg.createdAt ? new Date(reg.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-"}
                  </TableCell>
                  <TableCell>
                    {reg.paymentProof ? (
                      <Tooltip
                        title={
                          <img
                            src={reg.paymentProof}
                            alt="Payment proof"
                            style={{ maxWidth: 280, maxHeight: 280, display: "block" }}
                          />
                        }
                        arrow
                        placement="left"
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
                          onClick={() => window.open(reg.paymentProof, "_blank")}
                        >
                          <img
                            src={reg.paymentProof}
                            alt="Payment proof thumbnail"
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                              borderRadius: 6,
                              border: "2px solid #1976d2",
                            }}
                          />
                          <OpenInNewIcon sx={{ fontSize: 14, color: "#1976d2" }} />
                        </Box>
                      </Tooltip>
                    ) : (
                      <Typography variant="caption" sx={{ color: "#f44336" }}>Not uploaded</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={reg.paymentStatus || "pending"}
                      color={statusColors[reg.paymentStatus] || "default"}
                      size="small"
                    />
                    {reg.confirmationEmailSent && (
                      <Typography variant="caption" sx={{ display: "block", color: "#4caf50", fontSize: "0.7rem", mt: 0.5 }}>
                        ✉️ Email sent
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Stack direction="column" spacing={0.5}>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        disabled={reg.paymentStatus === "verified" || actioningId === reg._id}
                        onClick={() => handleAction(reg._id, "verify")}
                        sx={{ fontSize: "0.7rem", py: 0.5 }}
                      >
                        {actioningId === reg._id ? "..." : "✅ Verify"}
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        disabled={reg.paymentStatus === "rejected" || actioningId === reg._id}
                        onClick={() => handleAction(reg._id, "reject")}
                        sx={{ fontSize: "0.7rem", py: 0.5 }}
                      >
                        ❌ Reject
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {registrations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} align="center" sx={{ py: 4, color: "#888" }}>
                    No registrations yet.
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
