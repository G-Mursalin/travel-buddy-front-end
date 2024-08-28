import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  Avatar,
  Card,
  CardContent,
  Stack,
  Link,
} from '@mui/material';
import Image from 'next/image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import PublicIcon from '@mui/icons-material/Public';
import { dateTimeUtils } from '@/utils/dateTimeUtils';
import { TPhoto, TTrip, TUser } from '@/types';

type TTripPageProps = {
  params: { tripId: string };
};

const TripPage = async ({ params }: TTripPageProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/trip/${params.tripId}`,
    {
      cache: 'no-store',
    }
  );

  const { data: trip }: { data: TTrip } = await res.json();
  const { user }: { user: TUser } = trip;

  const nights = dateTimeUtils.calculateNights(trip.endDate, trip.startDate);

  return (
    <Container maxWidth="lg" style={{ marginBottom: '20px' }} sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {trip?.destination}
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <LocationOnIcon color="action" />
              <Typography variant="subtitle1" color="textSecondary" ml={1}>
                Southern Europe
              </Typography>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
              <Chip icon={<CalendarTodayIcon />} label={`${nights} nights`} />
              <Chip icon={<GroupIcon />} label="2 - 4 Mates" />
              <Chip icon={<PublicIcon />} label={trip?.travelType} />
            </Box>
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              {trip?.photos.map((photo: TPhoto) => (
                <Box
                  key={photo.id}
                  sx={{ flex: 1, height: 300, position: 'relative' }}
                >
                  <Image
                    src={photo.image}
                    alt={`Trip photo ${photo.id + 1}`}
                    layout="fill"
                    objectFit="cover"
                    style={{ borderRadius: '8px' }}
                  />
                </Box>
              ))}
            </Stack>
            <Typography
              component="section"
              variant="body1"
              mt={3}
              dangerouslySetInnerHTML={{ __html: trip.description }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Trip Booking
                </Typography>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    Total Price
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    ${trip.budget}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    Start Date
                  </Typography>
                  <Typography variant="body2">
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    }).format(new Date(trip.startDate))}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    End Date
                  </Typography>
                  <Typography variant="body2">
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    }).format(new Date(trip.endDate))}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Reserve Spot
                </Button>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                  mt={1}
                >
                  {10} spots left
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Meet Your Trip Leader
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    src={user.profileImage}
                    alt="Host Name"
                    sx={{ width: 64, height: 64 }}
                  />
                  <Box ml={2}>
                    <Typography variant="h6">{user?.userName}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user?.bio}
                    </Typography>
                    <Link href="#" underline="always" color="primary">
                      View profile
                    </Link>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TripPage;
