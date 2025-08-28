import React from 'react';
import { Container, Typography } from '@mui/material';
import './AboutContest.css';

const AboutContest = () => {
  return (
    <div className="section">
      <Container maxWidth="lg">
        {/* Heading */}
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          align="center"
          sx={{ color: 'white', textShadow: '2px 2px 6px black' }}
        >
          About the Contest
        </Typography>

        {/* Paragraph */}
        <Typography
          variant="h6"
          component="p"
          paragraph
          align="center"
          sx={{ color: 'white', textShadow: '2px 2px 6px black' }}
        >
          Mic Masters India is the country’s biggest national-level singing competition that provides a platform for talented artists to showcase their skills across different genres. Whether you are a singer, composer, lyricist, rapper, or devotional performer, this is your chance to shine!
        </Typography>
      </Container>
    </div>
  );
};

export default AboutContest;
