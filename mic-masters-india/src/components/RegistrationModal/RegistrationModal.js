import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Button,
  Slide
} from '@mui/material';
import './RegistrationModal.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RegistrationModal = ({ open, onClose }) => {
  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    education: "",
    interested: "",
    inquiry: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  // Handle submit (save to backend)
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
        onClose();
      } else {
        alert("❌ Error: " + result.message);
      }
    } catch (err) {
      console.error("❌ Network Error:", err);
      alert("❌ Network error while saving registration");
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
    >
      <DialogTitle className="modal-title">
        Register for Mic Masters India
      </DialogTitle>
      <DialogContent className="modal-content">
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={registrationData.fullName}
            onChange={handleInputChange}
            margin="normal"
            required
            className="text-field"
          />

          {/* Mobile Number */}
          <TextField
            fullWidth
            label="Mobile Number"
            name="mobile"
            value={registrationData.mobile}
            onChange={handleInputChange}
            margin="normal"
            required
            className="text-field"
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={registrationData.email}
            onChange={handleInputChange}
            margin="normal"
            required
            className="text-field"
          />

          {/* Current Education */}
          <TextField
            fullWidth
            label="Current Education"
            name="education"
            value={registrationData.education}
            onChange={handleInputChange}
            margin="normal"
            required
            className="text-field"
          />

          {/* Interested in Music/Singing */}
          <TextField
            fullWidth
            select
            label="Interested in Music/Singing Courses?"
            name="interested"
            value={registrationData.interested}
            onChange={handleInputChange}
            margin="normal"
            required
            className="text-field"
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>

          {/* Inquiry */}
          <TextField
            fullWidth
            label="Inquiry / Your Question"
            name="inquiry"
            value={registrationData.inquiry}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={3}
            className="text-field"
          />

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            className="submit-button"
          >
            Proceed to Payment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
