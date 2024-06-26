import React from "react";
import { Box, Button, Typography } from "@mui/material";
import heroImage from "@/assets/images/hero-section-image.webp";
import Link from "next/link";
import HeroButton from "./HeroButton";

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${heroImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        padding: "0 20px",
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: "bold",
          mb: 2,
          fontSize: {
            xs: "1.5rem",
            sm: "2rem",
            md: "3rem",
          },
        }}
      >
        Find A Travel Buddy, Share Costs & Experiences
      </Typography>
      <HeroButton />
      <Typography
        variant="body1"
        sx={{
          mt: 2,
          color: "white",
          fontSize: {
            xs: "0.8rem",
            sm: "0.9rem",
            md: "1rem",
          },
        }}
      >
        Travelers From <strong>190+ Countries</strong> Have Started{" "}
        <strong>Over 40000 Trips</strong> on Travel Buddy
      </Typography>
    </Box>
  );
};

export default HeroSection;
