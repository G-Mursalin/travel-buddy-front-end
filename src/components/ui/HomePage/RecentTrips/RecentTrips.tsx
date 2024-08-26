import { tripApi } from '@/api/tripApi';
import TripCard from '@/components/AllTrips/TripCard';
import { TTrip } from '@/types';
import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';

const RecentTrips = async () => {
  const { data: trips }: { data: TTrip[] } = await tripApi.getRecentTrips();

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom mb={2} mt={8}>
        Recent Trips
      </Typography>
      {/* Cards */}
      <Grid container spacing={3} my={{ md: 5, xs: 3 }}>
        {trips?.map((trip: TTrip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', marginTop: 3 }}>
        <Button
          variant="contained"
          component={Link}
          href="/all-trip"
          color="primary"
        >
          See More
        </Button>
      </Box>
    </Box>
  );
};

export default RecentTrips;
