"use client";

import { useGetRequestedTripsQuery } from "@/redux/api/tripRequestApi";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { useEffect, useState } from "react";

const TripRequestedHistoryPage = () => {
  const [allRequestedTrips, setAllRequestedTrips] = useState([]);
  const { data, isFetching, isLoading } = useGetRequestedTripsQuery(undefined);

  const trips = data?.data;

  useEffect(() => {
    const updateData = trips
      ?.map((data: any) => {
        if (data.tripId) {
          return {
            id: data._id,
            photo: data.tripId.photo,
            destination: data.tripId.destination,
            description: data.tripId.description,
            startDate: data.tripId.startDate,
            endDate: data.tripId.endDate,
            budget: data.tripId.budget,
            status: data.status,
          };
        }
      })
      .filter((item: any) => item !== undefined);

    setAllRequestedTrips(updateData);
  }, [trips]);

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box display="flex" alignItems="center" width="100%" height="100%">
            <Image
              src={row?.photo}
              width={65}
              height={65}
              alt={`${row?.id}-image`}
              style={{ borderRadius: "50%" }}
            />
          </Box>
        );
      },
    },
    { field: "destination", headerName: "Destination", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
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
