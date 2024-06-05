"use client";

import Spinner from "@/components/Shared/Spinner/Spinner";
import { useGetTripQuery } from "@/redux/api/tripApi";
import { TTrip } from "@/types";
import { Box, Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type TParams = {
  params: {
    tripId: string;
  };
};

const TripDetailsPage = ({ params }: TParams) => {
  const id = params?.tripId;
  const { data, isLoading, isFetching } = useGetTripQuery(id);
  const router = useRouter();

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  const trip: TTrip = data?.data;

  if (!trip) {
    return <p>No trip details found.</p>;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        {trip.destination}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={trip.photo}
              alt={trip.destination}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Travel Information</Typography>
          <Typography variant="body1" gutterBottom>
            {trip.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Start Date:</strong> {trip.startDate}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>End Date:</strong> {trip.endDate}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Budget:</strong> ${trip.budget}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Travel Type:</strong> {trip.travelType}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push(`/dashboard/trip-request/${trip._id}`)}
            sx={{ mt: 2 }}
          >
            Request to Join Trip
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Itinerary
        </Typography>
        <Typography variant="body1" gutterBottom>
          Day 1: Arrival at {trip.destination}, check-in at the hotel, and a
          welcome dinner.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Day 2: City tour including visits to local landmarks and museums.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Day 3: Free day to explore the city on your own.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Day 4: Departure.
        </Typography>
      </Box>
    </Box>
  );
};

export default TripDetailsPage;
