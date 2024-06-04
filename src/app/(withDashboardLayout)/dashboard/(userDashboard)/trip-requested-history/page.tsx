"use client";

import { useGetRequestedTripsQuery } from "@/redux/api/tripRequestApi";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const TripRequestedHistoryPage = () => {
  const [allRequestedTrips, setAllRequestedTrips] = useState([]);
  const { data, isFetching, isLoading } = useGetRequestedTripsQuery(undefined);

  const trips = data?.data;

  useEffect(() => {
    const updateData = trips?.map((data: any) => {
      return {
        id: data._id,
        destination: data.tripId.destination,
        startDate: data.tripId.startDate,
        endDate: data.tripId.endDate,
        budget: data.tripId.budget,
        status: data.status,
      };
    });

    setAllRequestedTrips(updateData);
  }, [trips]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "destination", headerName: "Destination", flex: 1 },
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
    { field: "budget", headerName: "Budget", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
    <Box>
      {!isFetching || !isLoading ? (
        <Box my={2}>
          <DataGrid rows={allRequestedTrips ?? []} columns={columns} />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default TripRequestedHistoryPage;
