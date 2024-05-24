import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
  Container,
} from "@mui/material";
import {
  Email,
  Phone,
  Facebook,
  Twitter,
  Instagram,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Container>
      <Box
        component="footer"
        sx={{
          backgroundColor: "#f0f0f0",
          padding: "40px 20px",
          mt: "auto",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Contact Information
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Email sx={{ mr: 1 }} />
              <Typography>Email: travelbuddy@gmail.com</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Phone sx={{ mr: 1 }} />
              <Typography>Phone: (+880) 1755-667788</Typography>
            </Box>
            <Box>
              <IconButton
                component={Link}
                href="https://facebook.com"
                target="_blank"
                sx={{ color: "inherit" }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                component={Link}
                href="https://twitter.com"
                target="_blank"
                sx={{ color: "inherit" }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                component={Link}
                href="https://instagram.com"
                target="_blank"
                sx={{ color: "inherit" }}
              >
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Additional Links
            </Typography>
            <Link href="/" sx={{ display: "block", mb: 1 }}>
              Terms of Use
            </Link>
            <Link href="/" sx={{ display: "block", mb: 1 }}>
              Privacy Policy
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body2" sx={{ mt: { xs: 2, sm: 0 } }}>
              © {new Date().getFullYear()} Travel Buddy. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Footer;
