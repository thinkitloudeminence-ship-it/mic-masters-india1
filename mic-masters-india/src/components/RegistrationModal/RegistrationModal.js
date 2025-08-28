import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Button,
  Slide,
  IconButton,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './RegistrationModal.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RegistrationModal = ({ open, onClose, registrationData, handleInputChange, handleSubmit }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          color: 'white'
        }
      }}
    >
      {/* Title with Close Button */}
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
          color: 'black',
          position: 'relative'
        }}
      >
        Register for Mic Masters India
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: 'black' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Full Name', name: 'fullName', type: 'text' },
            { label: 'Age', name: 'age', type: 'number' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Mobile Number', name: 'mobile', type: 'text' },
            { label: 'City', name: 'city', type: 'text' },
          ].map((field, i) => (
            <TextField
              key={i}
              fullWidth
              label={field.label}
              name={field.name}
              type={field.type}
              value={registrationData[field.name]}
              onChange={handleInputChange}
              margin="normal"
              required
              InputProps={{
                style: {
                  borderRadius: '12px',
                  background: '#fff',
                }
              }}
            />
          ))}

          <TextField
            fullWidth
            select
            label="Singing Category"
            name="category"
            value={registrationData.category}
            onChange={handleInputChange}
            margin="normal"
            required
            InputProps={{
              style: {
                borderRadius: '12px',
                background: '#fff'
              }
            }}
          >
            <MenuItem value="Solo">Solo</MenuItem>
            <MenuItem value="Duet">Duet</MenuItem>
            <MenuItem value="Rap">Rap</MenuItem>
            <MenuItem value="Group">Group (3+ members)</MenuItem>
          </TextField>

          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: '30px',
                background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '0 6px 20px rgba(255,215,0,0.4)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #FF8C00, #FFD700)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(255,215,0,0.6)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Proceed to Payment
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
