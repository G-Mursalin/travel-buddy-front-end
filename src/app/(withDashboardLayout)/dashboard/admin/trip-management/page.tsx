"use client";

import {
  useDeleteTripMutation,
  useGetAllTripsQuery,
} from "@/redux/api/tripApi";
import { ErrorResponse, TTrip } from "@/types";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ChangeEvent, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import { toast } from "sonner";

type TRow = {
  id: string;
  photo: string;
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: string;
};

const TripManagementPage = () => {
  const [allTrips, setAllTrips] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query: Record<string, any> = {};

  query["page"] = page;
  query["limit"] = limit;

  const { data, isFetching, isLoading } = useGetAllTripsQuery({ ...query });
  const [deleteTrip] = useDeleteTripMutation();
  const router = useRouter();

  const trips = data?.data;
  const meta = data?.meta;

  // Handle Delete Post
  const handleDelete = async (data: TRow) => {
    try {
      const res = await deleteTrip(data.id).unwrap();

      toast.success(res.message);
    } catch (error: ErrorResponse | any) {
      if (error.data) {
        const errorMessage: string = error.data.errorSources.reduce(
          (acc: string, errorSource: Record<string, any>) =>
            acc + (acc ? " " : "") + errorSource.message,
          ""
        );
        toast.error(errorMessage);
      } else {
        toast.error("Fail to delete");
      }
    }
  };

  // Handle Pagination
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const updateData = trips?.map((data: TTrip) => {
      return {
        id: data._id,
        photo: data.photo,
        destination: data.destination,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        travelType: data.travelType,
        budget: data.budget,
      };
    });

    setAllTrips(updateData);
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
              src={row.photo}
              width={65}
              height={65}
              alt={`${row.id}-image`}
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
    { field: "travelType", headerName: "Travel Type", flex: 1 },
    { field: "budget", headerName: "Budget", flex: 1 },
    {
      field: "change-role",
      headerName: "Change Role",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Button
              component={Link}
              href={`/dashboard/admin/trip-management/${row.id}`}
              variant="outlined"
              size="small"
            >
              Edit
            </Button>
          </Box>
        );
      },
    },
    {
      field: "change-status",
      headerName: "Delete Post",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Button
              onClick={() => handleDelete(row)}
              variant="outlined"
              size="small"
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      {!isFetching || !isLoading ? (
        <Box my={2}>
          <DataGrid
            hideFooterPagination
            rows={allTrips ?? []}
            columns={columns}
            slots={{
              footer: () => {
                return (
                  <Box
                    sx={{
                      mb: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Pagination
                      color="primary"
                      count={meta?.totalPage}
                      page={page}
                      onChange={handleChange}
                    />
                  </Box>
                );
              },
            }}
          />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default TripManagementPage;
