import AllTripsDrawer from '@/components/AllTrips/AllTripsDrawer';
import AllTripsPagination from '@/components/AllTrips/AllTripsPagination';
import AllTripsSearchBox from '@/components/AllTrips/AllTripsSearchBox';
import AllTripsSidebar from '@/components/AllTrips/AllTripsSidebar';
import DrawerOpenButton from '@/components/AllTrips/DrawerOpenButton';
import TripCard from '@/components/AllTrips/TripCard';
import { dateTimeUtils } from '@/utils/dateTimeUtils';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';

const AllTripsPage = async ({ searchParams }: any) => {
  let res = await fetch('http://localhost:5000/api/v1/trip');

  const { data: trips } = await res.json();

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Box
            component="nav"
            sx={{
              width: { xs: 0, sm: 240, md: 300 },
              flexShrink: 0,
              position: 'sticky',
              top: 64,
              height: 'calc(100vh - 64px)',
              overflowY: 'auto',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <AllTripsSidebar />
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: {
                xs: '100%',
                sm: `calc(100% - 240px)`,
                md: `calc(100% - 300px)`,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <AllTripsSearchBox />
              {/* Show drawer open button in small screen */}
              <Box sx={{ display: { sm: 'none' } }}>
                <DrawerOpenButton />
              </Box>
            </Box>
            <Grid container spacing={3}>
              {/* Card */}
              {trips?.map((trip: any) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <AllTripsPagination />
            </Box>
          </Box>
        </Box>
        {/* Drawer */}
        <AllTripsDrawer />
      </Box>
    </Container>
  );
};

export default AllTripsPage;
