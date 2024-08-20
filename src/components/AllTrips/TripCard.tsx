import { dateTimeUtils } from '@/utils/dateTimeUtils';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';

const TripCard = ({ trip }: any) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: '200px',
            width: '100%',
            objectFit: 'cover',
            margin: 'auto',
          }}
          image={trip.photos[0]?.image}
          alt={trip.destination}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            component="div"
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.3rem' },
              fontWeight: 'bold',
            }}
          >
            {trip.destination}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dateTimeUtils.calculateNights(trip.startDate, trip.endDate)} nights
            • ${trip.budget}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {trip.travelType}
          </Typography>
          <Button
            variant="contained"
            component={Link}
            href={`/trips/${trip._id}`}
            sx={{
              mt: 2,
              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
            }}
          >
            View
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TripCard;
