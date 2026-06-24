<<<<<<< HEAD
import React from "react";
import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import "./Hero.css";
import heroBg from "./micmasterr.jpg";

// Contestant images
import actor from "./Top Indian Actor.jpg";
import poet from "./Top Indian Poet.jpg";
import singer from "./singer.jpg";
import comedian from "./Top Standup Comedian.jpg";
import mimicry from "./Best Indian Mimicry Artist.jpg";

const Hero = ({ isMobile }) => {
  const slides = [
    { type: "image", src: actor, name: "Actor" },
    { type: "image", src: poet, name: "Poet" },
    { type: "image", src: singer, name: "Singer" },
    { type: "image", src: comedian, name: "Standup Comedian" },
    { type: "image", src: mimicry, name: "Mimicry Artist" },
  ];

=======
import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import './Hero.css';

// Import your background image
import heroBg from './micmasterr.avif'; // make sure the file is inside src/assets or src/

const Hero = ({ onRegisterClick, isMobile }) => {
>>>>>>> 79ba03530b485e4de951769054c6cd23c386abf5
  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `url(${heroBg})`,
<<<<<<< HEAD
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        flexDirection: "column",
      }}
    >
      {/* Contestant Slider */}
      <Box sx={{ zIndex: 2, width: "100%", overflow: "hidden", mb: 4, px: 2 }}>
        <motion.div
          className="slider-track"
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          whileTap={{ cursor: "grabbing" }}
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
          style={{ display: "flex", gap: "30px" }}
        >
          {slides.concat(slides).map((slide, i) => (
            <motion.div
              className="slide-card"
              key={i}
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 6px 15px rgba(0,0,0,0.4)",
                minWidth: "280px",
                height: "280px",
              }}
            >
              <img
                src={slide.src}
                alt={slide.name}
                className="slide-media"
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "16px",
                  display: "block",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </Box>

      {/* Title + Subtitle */}
      <Box sx={{ zIndex: 2, px: 2 }}>
=======
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
>>>>>>> 79ba03530b485e4de951769054c6cd23c386abf5
        <Typography
          variant={isMobile ? "h3" : "h1"}
          component="h1"
          gutterBottom
<<<<<<< HEAD
          sx={{ textShadow: "2px 2px 6px black", color: "white" }}
=======
          sx={{ textShadow: '2px 2px 6px black', color: 'white' }}
>>>>>>> 79ba03530b485e4de951769054c6cd23c386abf5
        >
          Mic Masters India
        </Typography>

<<<<<<< HEAD
=======
        {/* Subtitle */}
>>>>>>> 79ba03530b485e4de951769054c6cd23c386abf5
        <Typography
          variant={isMobile ? "h6" : "h4"}
          component="h2"
          gutterBottom
<<<<<<< HEAD
          sx={{ textShadow: "2px 2px 6px black", color: "white" }}
        >
          Showcase Your Talent on the National Stage
        </Typography>
=======
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
>>>>>>> 79ba03530b485e4de951769054c6cd23c386abf5
      </Box>
    </div>
  );
};

export default Hero;
