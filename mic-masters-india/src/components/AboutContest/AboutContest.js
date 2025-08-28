import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import './AboutContest.css';

// Import singers PNG image
import singersBg from './groupimage.jpg';

const MusicBars = () => {
  return (
    <div className="music-bars">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

const AboutContest = () => {
  return (
    <div
      className="section about-contest-section"
      style={{
        position: 'relative',
        backgroundImage: `url(${singersBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',   // full height
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Dark overlay for readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1,
        }}
      />

      {/* Main content */}
      <Container maxWidth="lg" style={{ position: 'relative', zIndex: 2 }}>
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              color: 'white',
              textShadow: '2px 2px 6px black',
              fontWeight: 'bold',
            }}
          >
            About the Contest
          </Typography>
          <Box
            sx={{
              width: 100,
              height: 4,
              backgroundColor: '#FFD700',
              margin: '0 auto',
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Row Layout: Left + Center + Right */}
        <Grid
          container
          spacing={10}
          alignItems="center"
          justifyContent="center"
          sx={{ flexWrap: 'nowrap' }}
        >
          {/* Left Animation */}
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <MusicBars />
          </Grid>

          {/* Center Content */}
          <Grid item xs={6}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(6px)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h6"
                component="p"
                sx={{
                  color: 'white',
                  textShadow: '2px 2px 6px black',
                  lineHeight: 1.8,
                }}
              >
                Mic Masters India is the country’s{' '}
                <b>biggest national-level singing competition</b> that provides
                a platform for talented artists to showcase their talent across
                different genres. Whether you are a <b>singer</b>,{' '}
                <b>composer</b>, <b>lyricist</b>, <b>rapper</b>, or{' '}
                <b>devotional performer</b>, this is your chance to shine!
              </Typography>
            </Paper>
          </Grid>

          {/* Right Animation */}
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <MusicBars />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AboutContest;
