import React from "react";
import { Container, Typography, Link, Box } from "@mui/material";

const TravelBuddySection = () => {
  return (
    <Container maxWidth="md">
      <Box textAlign="center" my={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Why Travel Buddy is the Best Place for Finding a Travel Buddy
        </Typography>
        <Typography variant="body1" paragraph>
          Travel Buddy is perfect for solo travelers looking to{" "}
          <Link href="/" color="primary">
            meet like-minded travelers
          </Link>{" "}
          with similar itineraries. We have a 3-step verification process which
          includes social media, phone number, and valid government ID, so you
          can feel safe about your potential travel partner. With users from
          over 190 countries, you can connect, chat, and find the perfect travel
          buddy to meet up with using Travel Buddy.
        </Typography>
      </Box>
    </Container>
  );
};

export default TravelBuddySection;
