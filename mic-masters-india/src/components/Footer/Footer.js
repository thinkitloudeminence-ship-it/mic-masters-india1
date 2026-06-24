import React from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
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
        py: { xs: 3, sm: 4 },
        mt: 5,
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Main Flex Container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
          flexWrap: "wrap",
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          gap: { xs: 3, md: 2 },
        }}
      >
        {/* Left Side: Logo + About */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: { xs: 2, sm: 2 },
            flex: 1,
          }}
        >
          <img
            src={logo}
            alt="Mic Masters India Logo"
            style={{ height: "80px", width: "auto", objectFit: "contain" }}
          />
          <Box>
            <Typography
              variant="body1"
              sx={{
                maxWidth: "400px",
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                fontWeight: 500,
                textAlign: { xs: "center", sm: "left" },
                lineHeight: 1.6,
              }}
            >
              🎤 Mic Masters India – India's ultimate stage for upcoming singers
              and music enthusiasts. Join us and showcase your talent to the world!
            </Typography>
            {/* Address */}
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.5, mt: 1.5, justifyContent: { xs: "center", sm: "flex-start" } }}>
              <LocationOnIcon sx={{ fontSize: 18, color: "#E4405F", mt: 0.2, flexShrink: 0 }} />
              <Typography
                variant="body2"
                sx={{ color: "#444", fontSize: "0.85rem", maxWidth: "380px", textAlign: { xs: "center", sm: "left" } }}
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
            px: { xs: 0, md: 3 },
          }}
        >
          <Typography variant="caption" sx={{ color: "#888", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", fontSize: "0.72rem" }}>
            Sponsored By
          </Typography>
          <a
            href="https://www.google.com/maps/search/the+counseling+cafe+indore"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={counselingCafeLogo}
              alt="The Counseling Cafe – Sponsor"
              style={{ height: "70px", width: "auto", objectFit: "contain" }}
            />
          </a>
          <Typography variant="caption" sx={{ color: "#555", fontWeight: 500, textAlign: "center" }}>
            The Counseling Cafe
          </Typography>
        </Box>

        {/* Right Side: Register Button + Social Links */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 2, sm: 2, md: 3 },
            mt: { xs: 0, md: 0 },
          }}
        >
          <Button
            variant="contained"
            onClick={onRegisterClick}
            sx={{
              backgroundColor: "#FFD700",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "25px",
              px: { xs: 3, sm: 4 },
              py: 1.2,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              "&:hover": { backgroundColor: "#dfdfdf" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            🚀 Register Now
          </Button>

          {/* Social Links */}
          <Box sx={{ display: "flex", gap: { xs: 2, sm: 2, md: 3 } }}>
            <IconButton
              component="a"
              href="https://www.instagram.com/micmastersindia"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#E4405F" }}
            >
              <Instagram sx={{ fontSize: { xs: 32, sm: 36, md: 40 } }} />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.facebook.com/micmasterindia"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#1877F2" }}
            >
              <Facebook sx={{ fontSize: { xs: 32, sm: 36, md: 40 } }} />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.youtube.com/@micmastersindia"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#FF0000" }}
            >
              <YouTube sx={{ fontSize: { xs: 34, sm: 38, md: 42 } }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Copyright */}
      <Typography
        variant="body2"
        sx={{
          mt: { xs: 3, sm: 4 },
          color: "#555",
          textAlign: "center",
          fontSize: { xs: "0.85rem", sm: "0.9rem" },
        }}
      >
        © 2025–2026 Mic Masters India. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
