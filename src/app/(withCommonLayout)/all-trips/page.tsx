'use client';

import { dateTimeUtils } from '@/utils/dateTimeUtils';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  Drawer,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Pagination,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { x } from './x';
import { uiUtils } from '@/utils/uiUtils';
import AllTripsSidebar from '@/components/AllTrips/AllTripsSidebar';

const AllTripsPage = () => {
  const [trips, setTrips] = useState(x);
  const [meta, setMeta] = useState();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    travelType: [],
    priceRange: [],
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Fetch trips based on current page, searchTerm, and filters
    fetchTrips();
  }, [page, searchTerm, filters]);

  const fetchTrips = async () => {
    // Implement your API call here
    // Update trips and meta state with the fetched data
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value],
    }));
    setPage(1);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Container>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          {!isMobile && (
            <Box
              component="nav"
              sx={{
                width: { sm: 240, md: 300 },
                flexShrink: 0,
                position: 'sticky',
                top: 64,
                height: 'calc(100vh - 64px)',
                overflowY: 'auto',
              }}
            >
              <AllTripsSidebar
                filters={filters}
                handleFilterChange={handleFilterChange}
              />
            </Box>
          )}
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
              <TextField
                variant="outlined"
                placeholder="Search trips..."
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ flexGrow: 1 }}
              />
              {isMobile && (
                <IconButton onClick={toggleDrawer(true)}>
                  <FilterListIcon />
                </IconButton>
              )}
            </Box>
            <Grid container spacing={3}>
              {trips.map((trip) => (
                <Grid item key={trip._id} xs={12} sm={6} md={4} lg={3}>
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
                        {dateTimeUtils.calculateNights(
                          trip.startDate,
                          trip.endDate
                        )}{' '}
                        nights • ${trip.budget}
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
                        <uiUtils.ResponsiveButtonText
                          mobileText="View"
                          desktopText="View Details"
                        />
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={meta?.totalPage}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Box>
        </Box>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <AllTripsSidebar
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
        </Drawer>
      </Box>
    </Container>
  );
};

export default AllTripsPage;
