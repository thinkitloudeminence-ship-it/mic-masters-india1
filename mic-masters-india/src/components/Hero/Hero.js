import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import './Hero.css';

// Import your background image
import heroBg from './micmasterr.avif'; // make sure the file is inside src/assets or src/

const Hero = ({ onRegisterClick, isMobile }) => {
  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Dark overlay for readability */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        }}
      />

      {/* Content overlay */}
      <Box 
        sx={{ 
          zIndex: 2, 
          mt: -6,   // 👈 yeh content ko upar kheench lega
          px: 2     // horizontal padding thodi rakho
        }}
      >
        {/* Main Title */}
        <Typography
          variant={isMobile ? "h3" : "h1"}
          component="h1"
          gutterBottom
          sx={{ textShadow: '2px 2px 6px black', color: 'white' }}
        >
          Mic Masters India
        </Typography>

        {/* Subtitle */}
        <Typography
          variant={isMobile ? "h6" : "h4"}
          component="h2"
          gutterBottom
          sx={{ textShadow: '2px 2px 6px black', color: 'white' }}
        >
          Showcase Your Talent on the National Stage
        </Typography>

        {/* Button */}
        <Button
          variant="contained"
          size="large"
          className="register-button"
          onClick={onRegisterClick}
        >
          Register Now
        </Button>

        {/* Entry Fee */}
        <Typography
          variant="h5"
          component="p"
          align="center"
          sx={{ mt: 2, color: 'white', textShadow: '2px 2px 6px black' }}
        >
          Entry Fee: ₹200
        </Typography>
      </Box>
    </div>
  );
};

export default Hero;
