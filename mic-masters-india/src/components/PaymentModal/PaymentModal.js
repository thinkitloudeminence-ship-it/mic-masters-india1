import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, Button, Box, Slide, CircularProgress, Stack
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { QRCodeSVG } from "qrcode.react";
import API_BASE_URL from "../../config";
import "./PaymentModal.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FIXED_AMOUNT = 99;
const UPI_ID = "9826667279@ybl";
const PAYEE_NAME = "Savin Jain";
const UPI_DEEP_LINK = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${FIXED_AMOUNT}&cu=INR&tn=${encodeURIComponent("Mic Masters India Registration")}`;

export default function PaymentModal({ open, onClose, registrationData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setIsSubmitting(false);
      setUploadFile(null);
      setPreviewUrl(null);
      setIsSubmitted(false);
      setError("");
    }
  }, [open]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError("");
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large. Maximum size is 5MB.");
      return;
    }
    setUploadFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!uploadFile) {
      setError("Please upload a screenshot of your payment as proof.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    const formData = new FormData();
    Object.entries(registrationData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, value ?? "");
      }
    });
    formData.append("paymentProof", uploadFile);
    try {
      const resp = await fetch(`${API_BASE_URL}/api/registrations`, {
        method: "POST",
        body: formData,
      });
      const result = await resp.json();
      if (!resp.ok) throw new Error(result.message || "Submission failed");
      setIsSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth TransitionComponent={Transition}>
        <DialogContent sx={{ py: 5, textAlign: "center", bgcolor: "#1a1a1a", color: "white" }}>
          <CheckCircleIcon sx={{ fontSize: 64, color: "#4CAF50", mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Registration Submitted! 🎤
          </Typography>
          <Typography variant="body2" sx={{ color: "#ccc", mb: 1 }}>
            Your payment screenshot has been received and is pending verification by our team.
          </Typography>
          <Typography variant="body2" sx={{ color: "#FFD700", mb: 1 }}>
            You'll receive a confirmation email once your payment is verified.
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa" }}>
            Be on time to attend the event and perform your best! 🌟
          </Typography>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#1a1a1a", p: 3 }}>
          <Button onClick={onClose} variant="contained" fullWidth className="submit-button">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth TransitionComponent={Transition}>
      <DialogTitle className="modal-title" sx={{ textAlign: "center" }}>
        Complete Payment — ₹{FIXED_AMOUNT}
      </DialogTitle>

      <DialogContent className="modal-content">
        <Stack spacing={2.5} alignItems="center">

          <Typography align="center" variant="body2" className="payment-instructions">
            Scan the QR below using PhonePe, GPay, Paytm, or any UPI app
          </Typography>

          {/* UPI QR — ₹99 pre-filled and locked */}
          <Box sx={{ p: 2, background: "white", borderRadius: "12px", border: "3px solid #FFD700", display: "inline-block", lineHeight: 0 }}>
            <QRCodeSVG value={UPI_DEEP_LINK} size={220} level="H" includeMargin={false} />
          </Box>

          <Typography align="center" variant="body2" sx={{ color: "#aaa" }}>
            After payment, take a screenshot and upload it below as proof.
          </Typography>

          <label htmlFor="upload-proof" style={{ width: "100%" }}>
            <input
              id="upload-proof"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button variant="outlined" component="span" fullWidth startIcon={<CloudUploadIcon />} className="upload-button">
              {uploadFile ? "Change Screenshot" : "Upload Payment Screenshot"}
            </Button>
          </label>

          {previewUrl && (
            <Box sx={{ textAlign: "center" }}>
              <img
                src={previewUrl}
                alt="Payment proof preview"
                style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: 8, border: "1px solid #555" }}
              />
              <Typography variant="caption" className="upload-success" sx={{ display: "block", mt: 0.5 }}>
                ✓ {uploadFile.name}
              </Typography>
            </Box>
          )}

          {error && <Typography className="error-text">{error}</Typography>}
        </Stack>
      </DialogContent>

      <DialogActions className="modal-actions" sx={{ p: 3 }}>
        <Button onClick={onClose} className="cancel-button" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting || !uploadFile}
          className="submit-button"
          startIcon={isSubmitting ? <CircularProgress size={18} /> : null}
        >
          {isSubmitting ? "Submitting..." : "Submit Payment Proof"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}