import { TTrip } from '@/types';
import { dateTimeUtils } from '@/utils/dateTimeUtils';
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const TripCard = ({ trip }: { trip: TTrip }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
          <Image
            src={trip.photos[0]?.image}
            alt={trip.destination}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        <CardContent
          sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
        >
          <Typography
            gutterBottom
            component="div"
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.3rem' },
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            {trip.destination}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {dateTimeUtils.calculateNights(trip.startDate, trip.endDate)}{' '}
              nights
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${trip.budget}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {trip.travelType}
          </Typography>

          <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              component={Link}
              href={`/trip/${trip._id}`}
              sx={{
                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
              }}
            >
              View
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TripCard;
