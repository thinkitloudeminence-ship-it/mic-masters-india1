import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import Lottie from 'lottie-react';
import './Header.css';

// Import logo
import logo from './Logo.svg';

// Import Sound Bars Animation
import soundBarsAnimation from './Sound Bars Animation.json';

const Header = ({ onRegisterClick }) => {
  return (
    <AppBar 
      position="sticky" 
      className="header"
      sx={{
        background: '#fff', // white background
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 🔥 Full Background Animation */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          opacity: 0.2 // adjust visibility
        }}
      >
        {/* Multiple sound bars repeat */}
        <Lottie animationData={soundBarsAnimation} loop style={{ width: 150, height: 150 }} />
         <Lottie animationData={soundBarsAnimation} loop style={{ width: 150, height: 150 }} />
          <Lottie animationData={soundBarsAnimation} loop style={{ width: 150, height: 150 }} />
        <Lottie animationData={soundBarsAnimation} loop style={{ width: 150, height: 150 }} />
        <Lottie animationData={soundBarsAnimation} loop style={{ width: 150, height: 150 }} />
        
        <Lottie animationData={soundBarsAnimation} loop style={{ width: 150, height: 150 }} />
           <Lottie animationData={soundBarsAnimation} loop style={{ width: 150, height: 150 }} />
      </Box>

      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        
        {/* Left side Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={logo} 
            alt="Mic Masters India Logo" 
            style={{ height: '120px', width: 'auto', objectFit: 'contain' }} 
          />
        </Box>

        {/* Right side Register button */}
        <Box>
          <Button 
            variant="contained"
            className="register-button"
            onClick={onRegisterClick}
            sx={{
              backgroundColor: '#FFD700',
              color: '#000',
              fontWeight: 'bold',
              borderRadius: '20px',
              px: 3,
              '&:hover': { backgroundColor: '#dfdfdf' }
            }}
          >
            🎤 Register Now
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
