import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const HowWorks = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        How GAFFL Works
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              boxShadow: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box textAlign="center">
                <SearchIcon fontSize="large" color="primary" />
                <Typography variant="h6" gutterBottom>
                  Search Destination
                </Typography>
                <Typography>
                  Search and select a destination that you are traveling to.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              boxShadow: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box textAlign="center">
                <GroupIcon fontSize="large" color="primary" />
                <Typography variant="h6" gutterBottom>
                  Find Travel Partners
                </Typography>
                <Typography>
                  Browse through the list of trips, locals, and nearby users in
                  that location.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              boxShadow: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box textAlign="center">
                <ConnectWithoutContactIcon fontSize="large" color="primary" />
                <Typography variant="h6" gutterBottom>
                  Get Connected
                </Typography>
                <Typography>
                  When you find someone that you want to meet up with, click the
                  connect button and start chatting with them.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              boxShadow: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box textAlign="center">
                <TravelExploreIcon fontSize="large" color="primary" />
                <Typography variant="h6" gutterBottom>
                  Trip Together
                </Typography>
                <Typography>
                  Plan together, meet up with your travel companion at a
                  pre-decided public place and travel together.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HowWorks;
