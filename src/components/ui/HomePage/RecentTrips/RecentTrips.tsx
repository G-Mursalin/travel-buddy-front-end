import { tripApi } from '@/api/tripApi';
import { TTrip } from '@/types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';

const RecentTrips = async () => {
  const { data: trips } = await tripApi.getRecentTrips();

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom mb={2} mt={8}>
        Recent Trips
      </Typography>
      {/* Cards */}
      <Grid container spacing={3} my={{ md: 5, xs: 3 }}>
        {trips?.map((trip: TTrip) => (
          <Grid item key={trip._id} xs={12} sm={6} md={3}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={trip.photo}
                alt={trip.destination}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {trip.destination}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {trip.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start Date: {trip.startDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  End Date: {trip.endDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Budget: ${trip.budget}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Travel Type: {trip.travelType}
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  href={`/dashboard/trips/${trip._id}`}
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  See Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', marginTop: 3 }}>
        <Button
          variant="contained"
          component={Link}
          href="/dashboard/trips"
          color="primary"
        >
          See More
        </Button>
      </Box>
    </Box>
  );
};

export default RecentTrips;
