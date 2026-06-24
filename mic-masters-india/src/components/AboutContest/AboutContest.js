import React, { useEffect, useRef, useState } from "react";
import { Container, Typography, Box, Paper, Grid, Button } from "@mui/material";
import "./AboutContest.css";

// ✅ Background video import (compressed to ~600KB, was originally 30MB 4K)
import contestVideo from "./contest-bg.mp4";

const AboutContest = ({ onRegisterClick }) => {
  const sectionRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // Lazy-load the video only once this section is about to enter the
  // viewport, instead of downloading it immediately on page load.
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // start loading a bit before it's visible
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="section about-contest-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "40px 20px",
        overflow: "hidden",
        backgroundColor: "#7b3fe4", // matches video's base color, avoids a flash before video loads
      }}
    >
      {/* ✅ Background Video - lazy-loaded, compressed, metadata-only preload */}
      {shouldLoadVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src={contestVideo} type="video/mp4" />
        </video>
      )}

      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
          zIndex: 1,
        }}
      />

      {/* Main content */}
      <Container maxWidth="lg" style={{ position: "relative", zIndex: 2 }}>
        {/* Heading */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.2rem" },
              color: "#111",
              letterSpacing: "1px",
            }}
          >
            🎤 About the Contest
          </Typography>
          <Box
            sx={{
              width: 80,
              height: 5,
              background:
                "linear-gradient(90deg, #ff6f61, #ffcc00, #00c9a7)",
              margin: "10px auto",
              borderRadius: 3,
            }}
          />
        </Box>

        <Grid container justifyContent="center">
          <Grid item xs={12} md={9}>
            <Paper
              elevation={10}
              sx={{
                p: { xs: 3, sm: 5 },
                borderRadius: "20px",
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(10px)",
                textAlign: "center",
                boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#333",
                  lineHeight: 1.9,
                  fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
                  mb: 3,
                }}
              >
                <b>Mic Masters India</b> is the country’s{" "}
                <b style={{ color: "#e63946" }}>
                  biggest national-level singing competition
                </b>{" "}
                that provides a premium stage for emerging talent across
                different genres. Whether you are a{" "}
                <b style={{ color: "#457b9d" }}>singer</b>,{" "}
                <b style={{ color: "#ff6f61" }}>composer</b>,{" "}
                <b style={{ color: "#00c9a7" }}>lyricist</b>,{" "}
                <b style={{ color: "#ffb703" }}>rapper</b>, or{" "}
                <b style={{ color: "#9d4edd" }}>devotional performer</b>, this
                is your golden chance to shine on the national stage! 🌟
              </Typography>

              {/* ✅ Attractive Button */}
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: { xs: 4, sm: 6 },
                  py: { xs: 1.5, sm: 2 },
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  borderRadius: "50px",
                  background:
                    "linear-gradient(90deg, #ff6f61, #ffcc00, #00c9a7)",
                  color: "black",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                  },
                }}
                onClick={onRegisterClick}
              >
                Register Now 🚀
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AboutContest;
