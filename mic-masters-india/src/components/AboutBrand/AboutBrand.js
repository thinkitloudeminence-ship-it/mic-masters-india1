import React from 'react';
<<<<<<< HEAD
import { Container, Typography, Grid, Box } from '@mui/material';
import './AboutBrand.css';

// Import your image
import aboutBrandImg from './aboutbrand.jpg'; // compressed jpg (was an oversized non-transparent png)
=======
import { Container, Typography, Box } from '@mui/material';
import './AboutBrand.css';

// Import your image
import aboutBrandImg from './aboutbrand.png';
>>>>>>> 79ba03530b485e4de951769054c6cd23c386abf5

const AboutBrand = () => {
  return (
    <div className="section dark-bg">
      <Container maxWidth="lg">
<<<<<<< HEAD
        <Grid 
          container 
          spacing={{ xs: 2, sm: 4, md: 6 }} 
          alignItems="center"
        >
          {/* Left Side - Text */}
          <Grid item xs={12} md={6}>
            <Box textAlign="center">
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                className="white-text"
                sx={{
                  fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
                  fontWeight: "bold",
                  mb: { xs: 2, md: 3 }
                }}
              >
                About MIC Masters India
              </Typography>
              <Typography
                variant="h6"
                component="p"
                paragraph
                sx={{
                  fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                  lineHeight: { xs: 1.6, sm: 1.7, md: 1.8 },
                  color: "white",
                  textAlign: "justify",
                  mb: { xs: 2, md: 3 }
                }}
              >
                MIC Masters India is organized by a team of music industry professionals 
                with over 15 years of experience in discovering and promoting new talent. 
                Our previous contestants have gone on to successful careers in the music industry, 
                with some even landing recording contracts and performing on national television.
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{
                  fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                  lineHeight: { xs: 1.6, sm: 1.7, md: 1.8 },
                  color: "white",
                  textAlign: "justify"
                }}
              >
                Our mission is to provide a fair and professional platform for aspiring singers 
                to be discovered and nurtured.
              </Typography>
            </Box>
          </Grid>

          {/* Right Side - Image */}
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center">
              <img
                src={aboutBrandImg}
                alt="About MIC Masters India"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
                }}
              />
            </Box>
          </Grid>
        </Grid>
=======
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
>>>>>>> 79ba03530b485e4de951769054c6cd23c386abf5
      </Container>
    </div>
  );
};

export default AboutBrand;
