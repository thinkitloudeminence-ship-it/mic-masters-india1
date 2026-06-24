import React from "react";
import { Box, Button, Typography, IconButton, Divider } from "@mui/material";
import { Facebook, Instagram, YouTube } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./Footer.css";
import logo from "./Logo.svg";
import counselingCafeLogo from "../Hero/THE COUNSELING CAFE_logo_01__PNG (2).png";

const Footer = ({ onRegisterClick }) => {
  return (
    <Box
      component="footer"
      sx={{
        background: "#f1f1f1",
        color: "#000",
        py: { xs: 4, sm: 5 },
        mt: 5,
        position: "relative",
        zIndex: 1,
        borderTop: "2px solid #e0e0e0",
      }}
    >
      {/* Main Flex Container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "stretch" },
          textAlign: { xs: "center", md: "left" },
          flexWrap: "wrap",
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 3, sm: 4, md: 5 },
          gap: { xs: 4, md: 3 },
        }}
      >
        {/* Left Side: Logo + About */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            gap: { xs: 2, sm: 3 },
            flex: { xs: "1 1 100%", md: "0 1 50%" },
            minWidth: { xs: "100%", md: "300px" },
          }}
        >
          <img
            src={logo}
            alt="Mic Masters India Logo"
            style={{ 
              height: "80px", 
              width: "auto", 
              objectFit: "contain",
              flexShrink: 0
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body1"
              sx={{
                maxWidth: "450px",
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                fontWeight: 500,
                textAlign: { xs: "center", sm: "left" },
                lineHeight: 1.7,
                color: "#222",
              }}
            >
              🎤 Mic Masters India – India's ultimate stage for upcoming singers
              and music enthusiasts. Join us and showcase your talent to the world!
            </Typography>
            {/* Address */}
            <Box sx={{ 
              display: "flex", 
              alignItems: "flex-start", 
              gap: 0.5, 
              mt: 1.5,
              justifyContent: { xs: "center", sm: "flex-start" }
            }}>
              <LocationOnIcon sx={{ 
                fontSize: 20, 
                color: "#E4405F", 
                mt: 0.3,
                flexShrink: 0 
              }} />
              <Typography
                variant="body2"
                sx={{ 
                  color: "#555", 
                  fontSize: "0.85rem", 
                  maxWidth: "380px", 
                  textAlign: { xs: "center", sm: "left" },
                  lineHeight: 1.6
                }}
              >
                <strong>Venue:</strong> 26-27, Hotel Amrit, Near Sardar Patel Bridge,<br />
                Chhoti Gwaltoli, Indore, Madhya Pradesh – 452001
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Center: Sponsored By */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            px: { xs: 0, md: 2 },
            flex: { xs: "1 1 100%", md: "0 1 auto" },
            minWidth: { xs: "100%", md: "140px" },
          }}
        >
          <Typography variant="caption" sx={{ 
            color: "#999", 
            fontWeight: 600, 
            letterSpacing: 1.5, 
            textTransform: "uppercase", 
            fontSize: "0.7rem" 
          }}>
            Sponsored By
          </Typography>
          <a
            href="https://www.google.com/maps/search/the+counseling+cafe+indore"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block" }}
          >
            <img
              src={counselingCafeLogo}
              alt="The Counseling Cafe – Sponsor"
              style={{ 
                height: "75px", 
                width: "auto", 
                objectFit: "contain",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            />
          </a>
          <Typography variant="caption" sx={{ 
            color: "#666", 
            fontWeight: 600, 
            textAlign: "center",
            fontSize: "0.8rem",
            letterSpacing: 0.5
          }}>
            The Counseling Cafe
          </Typography>
        </Box>

        {/* Right Side: Register Button + Social Links */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-end" },
            gap: { xs: 2.5, sm: 3, md: 3 },
            flex: { xs: "1 1 100%", md: "0 1 auto" },
            minWidth: { xs: "100%", md: "200px" },
          }}
        >
          <Button
            variant="contained"
            onClick={onRegisterClick}
            sx={{
              backgroundColor: "#FFD700",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "30px",
              px: { xs: 4, sm: 5 },
              py: 1.3,
              fontSize: { xs: "0.95rem", sm: "1rem" },
              "&:hover": { 
                backgroundColor: "#F5C900",
                transform: "scale(1.02)",
                transition: "all 0.2s ease"
              },
              width: { xs: "100%", sm: "auto" },
              minWidth: { sm: "180px" },
              boxShadow: "0 4px 12px rgba(255, 215, 0, 0.3)",
            }}
          >
            🚀 Register Now
          </Button>

          {/* Social Links */}
          <Box sx={{ 
            display: "flex", 
            gap: { xs: 2, sm: 2.5, md: 3 },
            alignItems: "center"
          }}>
            <IconButton
              component="a"
              href="https://www.instagram.com/micmastersindia"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                color: "#E4405F",
                "&:hover": {
                  transform: "scale(1.15)",
                  transition: "transform 0.2s ease",
                }
              }}
            >
              <Instagram sx={{ fontSize: { xs: 34, sm: 38, md: 40 } }} />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.facebook.com/micmasterindia"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                color: "#1877F2",
                "&:hover": {
                  transform: "scale(1.15)",
                  transition: "transform 0.2s ease",
                }
              }}
            >
              <Facebook sx={{ fontSize: { xs: 34, sm: 38, md: 40 } }} />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.youtube.com/@micmastersindia"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                color: "#FF0000",
                "&:hover": {
                  transform: "scale(1.15)",
                  transition: "transform 0.2s ease",
                }
              }}
            >
              <YouTube sx={{ fontSize: { xs: 36, sm: 40, md: 44 } }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Divider */}
      <Divider sx={{ 
        maxWidth: "1200px", 
        mx: "auto", 
        my: { xs: 3, sm: 4 },
        borderColor: "#ddd"
      }} />

      {/* Copyright */}
      <Typography
        variant="body2"
        sx={{
          color: "#777",
          textAlign: "center",
          fontSize: { xs: "0.8rem", sm: "0.85rem" },
          fontWeight: 400,
          letterSpacing: 0.3,
        }}
      >
        © 2025–2026 Mic Masters India. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;