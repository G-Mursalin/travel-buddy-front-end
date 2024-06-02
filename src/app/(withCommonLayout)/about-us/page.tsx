import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";

const AboutUsPage = () => {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          About Us
        </Typography>
        <Box my={2}>
          <Typography variant="h5" component="h2">
            Mission Statement
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to connect travelers from all over the world,
            enabling them to share costs and experiences, and create lasting
            friendships. We believe in the power of travel to bring people
            together and create unforgettable memories.
          </Typography>
        </Box>
        <Box my={2}>
          <Typography variant="h5" component="h2">
            Team Information
          </Typography>
          <Typography variant="body1" paragraph>
            We are a diverse team of travel enthusiasts, tech experts, and
            customer service professionals dedicated to making your travel
            experiences extraordinary. Our team is committed to providing a
            seamless and enjoyable platform for finding travel companions and
            planning trips.
          </Typography>
        </Box>
        <Box my={2}>
          <Typography variant="h5" component="h2">
            Contact Information
          </Typography>
          <Typography variant="body1" paragraph>
            For inquiries, support, or more information, you can reach us at:
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Link href="mailto:support@gogaffl.com">
                Email: travelbuddy@gmail.com
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="/about-us">Phone: (+880) 1755-667788</Link>
            </Grid>
            <Grid item xs={12}>
              <Link
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener"
              >
                Facebook
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="https://twitter.com" target="_blank" rel="noopener">
                Twitter
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener"
              >
                Instagram
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutUsPage;
