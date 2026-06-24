import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent,
  TextField, MenuItem, Button, Slide, Select, InputLabel, FormControl, Checkbox, ListItemText, OutlinedInput
} from "@mui/material";
import PaymentModal from "../PaymentModal/PaymentModal";
import "./RegistrationModal.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Hobbies options
const hobbiesList = ["Acting", "Singing", "Dancing", "Painting", "Writing", "Sports", "Others"];

// Education categories
const educationOptions = [
  "High School",
  "Diploma",
  "Graduate",
  "Post Graduate",
  "PhD",
  "Other",
];

// Categories (competition type)
const categoryOptions = ["Solo", "Group", "Band", "Instrumental"];

const RegistrationModal = ({ open, onClose }) => {
  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    education: "",
    educationOther: "",
    hobbies: [],
    category: "",
    interested: "",
    inquiry: "",
  });

  const [errors, setErrors] = useState({});
  const [openPayment, setOpenPayment] = useState(false);

  // ✅ Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // ✅ Hobbies multi select
  const handleHobbiesChange = (e) => {
    const { value } = e.target;
    setRegistrationData({ ...registrationData, hobbies: typeof value === "string" ? value.split(",") : value });
  };

  // ✅ Validation
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!/^[A-Za-z\s]+$/.test(registrationData.fullName)) {
      tempErrors.fullName = "Full name should contain only letters";
      isValid = false;
    }

    if (!/^[0-9]{10}$/.test(registrationData.mobile)) {
      tempErrors.mobile = "Mobile number must be 10 digits";
      isValid = false;
    }

    if (!/^\S+@\S+\.\S+$/.test(registrationData.email)) {
      tempErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (registrationData.education.trim() === "") {
      tempErrors.education = "Education is required";
      isValid = false;
    }

    if (registrationData.education === "Other" && registrationData.educationOther.trim() === "") {
      tempErrors.educationOther = "Please specify your education";
      isValid = false;
    }

    if (registrationData.hobbies.length === 0) {
      tempErrors.hobbies = "Please select at least one hobby";
      isValid = false;
    }

    if (registrationData.category.trim() === "") {
      tempErrors.category = "Please select a category";
      isValid = false;
    }

    if (registrationData.interested === "") {
      tempErrors.interested = "Please select an option";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // ✅ Submit
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setOpenPayment(true);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth TransitionComponent={Transition}>
        <DialogTitle className="modal-title">
          Register for Mic Masters India
        </DialogTitle>
        <DialogContent className="modal-content">
          <form onSubmit={handleProceedToPayment} style={{ display: "grid", gap: "12px" }}>
            
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={registrationData.fullName}
              onChange={handleInputChange}
              required
              error={!!errors.fullName}
              helperText={errors.fullName}
            />

            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              value={registrationData.mobile}
              onChange={handleInputChange}
              required
              error={!!errors.mobile}
              helperText={errors.mobile}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={registrationData.email}
              onChange={handleInputChange}
              required
              error={!!errors.email}
              helperText={errors.email}
            />

            {/* Education */}
            <TextField
              fullWidth
              select
              label="Current Education"
              name="education"
              value={registrationData.education}
              onChange={handleInputChange}
              required
              error={!!errors.education}
              helperText={errors.education}
            >
              {educationOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>

            {registrationData.education === "Other" && (
              <TextField
                fullWidth
                label="Other Education"
                name="educationOther"
                value={registrationData.educationOther}
                onChange={handleInputChange}
                required
                error={!!errors.educationOther}
                helperText={errors.educationOther}
              />
            )}

            {/* Hobbies Multi Select */}
            <FormControl fullWidth>
              <InputLabel>Hobbies</InputLabel>
              <Select
                multiple
                name="hobbies"
                value={registrationData.hobbies}
                onChange={handleHobbiesChange}
                input={<OutlinedInput label="Hobbies" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {hobbiesList.map((hobby) => (
                  <MenuItem key={hobby} value={hobby}>
                    <Checkbox checked={registrationData.hobbies.indexOf(hobby) > -1} />
                    <ListItemText primary={hobby} />
                  </MenuItem>
                ))}
              </Select>
              {errors.hobbies && <p style={{ color: "red", fontSize: "12px" }}>{errors.hobbies}</p>}
            </FormControl>

            {/* Category */}
            <TextField
              fullWidth
              select
              label="Category"
              name="category"
              value={registrationData.category}
              onChange={handleInputChange}
              required
              error={!!errors.category}
              helperText={errors.category}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              select
              label="Interested in Music/Singing?"
              name="interested"
              value={registrationData.interested}
              onChange={handleInputChange}
              required
              error={!!errors.interested}
              helperText={errors.interested}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Inquiry / Your Question"
              name="inquiry"
              value={registrationData.inquiry}
              onChange={handleInputChange}
              multiline
              rows={2}
            />

            <Button type="submit" variant="contained" fullWidth>
              Proceed to Payment
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* ✅ Payment Modal */}
      <PaymentModal
        open={openPayment}
        onClose={() => setOpenPayment(false)}
        registrationData={registrationData}
      />
    </>
  );
};

export default RegistrationModal;
