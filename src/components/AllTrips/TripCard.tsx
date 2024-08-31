import { TTrip } from '@/types';
import { dateTimeUtils } from '@/utils/dateTimeUtils';
import { Star, Bookmark } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const TripCard = ({ trip }: { trip: TTrip }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Link href={`/trip/${trip._id}`}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <div
              style={{ position: 'relative', width: '100%', height: '200px' }}
            >
              <Image
                src={trip.photos[0]?.image}
                alt={trip.destination}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                bgcolor: 'rgba(255,255,255,0.8)',
                borderRadius: '16px',
                px: 1,
                py: 0.5,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Bookmark fontSize="small" />
              <Typography variant="caption" component="span" sx={{ ml: 0.5 }}>
                {trip.photos.length}
              </Typography>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'rgba(0,0,0,0.6)',
                color: 'white',
                p: 1,
              }}
            >
              <Typography variant="body2">{trip.destination}</Typography>
            </Box>
          </Box>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar
                src={trip.user.profileImage}
                sx={{ width: 32, height: 32, mr: 1 }}
              />
              <Box>
                <Typography variant="subtitle2">
                  with {trip.user.userName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Star sx={{ fontSize: 16, color: 'gold', mr: 0.5 }} />
                  <Typography variant="body2">4.87</Typography>
                </Box>
              </Box>
            </Box>
            <Typography variant="h6" component="div" sx={{ mb: 1 }}>
              {trip?.title?.length > 20
                ? `${trip.title.slice(0, 15)}.....`
                : trip.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              }).format(new Date(trip.startDate))}{' '}
              • {dateTimeUtils.calculateNights(trip.startDate, trip.endDate)}{' '}
              Nights
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" component="div">
                ${trip.budget}
              </Typography>
              <Chip
                label={`${trip.numberOfBookingSpot} SPOT LEFT`}
                color="secondary"
                size="small"
              />
            </Box>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default TripCard;
