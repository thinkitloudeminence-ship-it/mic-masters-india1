import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import './AboutBrand.css';

// Import your image
import aboutBrandImg from './aboutbrand.png';

const AboutBrand = () => {
  return (
    <div className="section dark-bg">
      <Container maxWidth="lg">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={4}
        >
          {/* Left Side - Text */}
          <Box
            flex="1"
            minWidth="280px"
            sx={{
              background: 'rgba(255, 255, 255, 1)', // ✅ semi-transparent overlay
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ color: '#000000ff', fontWeight: 'bold' }} // ✅ gold heading
            >
              About MIC Masters India
            </Typography>
            <Typography
              variant="h6"
              component="p"
              paragraph
              sx={{ color: 'black', textShadow: 'white', lineHeight: 1.8  }}
            >
              MIC Masters India is organized by a team of music industry professionals 
              with over 15 years of experience in discovering and promoting new talent. 
              Our previous contestants have gone on to successful careers in the music industry, 
              with some even landing recording contracts and performing on national television.
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{ color: 'black', textShadow: 'white', lineHeight: 1.8 }}
            >
              Our mission is to provide a fair and professional platform for aspiring singers 
              to be discovered and nurtured.
            </Typography>
          </Box>

          {/* Right Side - Image */}
          <Box flex="1" display="flex" justifyContent="center" minWidth="280px">
            <img
              src={aboutBrandImg}
              alt="About MIC Masters India"
              style={{
                width: '70%',
                maxWidth: '280px',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
              }}
            />
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default AboutBrand;
