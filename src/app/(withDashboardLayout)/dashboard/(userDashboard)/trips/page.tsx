"use client";

import Spinner from "@/components/Shared/Spinner/Spinner";
import { travelType } from "@/constants/trip";
import { useGetAllTripsQuery } from "@/redux/api/tripApi";
import { TTrip } from "@/types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  MenuItem,
  Pagination,
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

const TravelCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
});

const TripsPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTravelType, setSelectedTravelType] = useState("");

  query["page"] = page;
  query["limit"] = limit;
  query["searchTerm"] = searchTerm;
  if (selectedTravelType) query["travelType"] = selectedTravelType;

  const {
    data: trips,
    isLoading,
    isFetching,
  } = useGetAllTripsQuery({ ...query });
  const meta = trips?.meta;

  //   Handle Pagination
  const handlePagination = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Handle Search
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  // Handle Select Change
  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedTravelType(event.target.value as string);
    setPage(1);
  };

  // Loading State
  if (isLoading || isFetching) {
    return <Spinner />;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      {/* Search Bar and Select */}
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            variant="outlined"
            value={searchTerm}
            placeholder="Search By: Destination, Description, Travel Types"
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="travel-type-select-label">Travel Type</InputLabel>
            <Select
              labelId="travel-type-select-label"
              value={selectedTravelType}
              onChange={handleSelectChange}
              label="Travel Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {travelType.map((type: string) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {/* Cards */}
      <Grid container spacing={3}>
        {trips?.data.map((trip: TTrip) => (
          <Grid item key={trip._id} xs={12} sm={6} md={3}>
            <TravelCard>
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
            </TravelCard>
          </Grid>
        ))}
      </Grid>
      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={meta?.totalPage}
          page={page}
          onChange={handlePagination}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default TripsPage;
