"use client";

import Spinner from "@/components/Shared/Spinner/Spinner";
import {
  useDeleteTripMutation,
  useGetLoginUserTripsQuery,
} from "@/redux/api/tripApi";
import { ErrorResponse, TTrip } from "@/types";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

const PostsPage = () => {
  const [allTrips, setAllTrips] = useState([]);
  const { data, isFetching, isLoading } = useGetLoginUserTripsQuery(undefined);
  const [deleteTrip] = useDeleteTripMutation();
  const router = useRouter();

  const trips = data?.data;

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
              href={`/dashboard/posts/${row.id}`}
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
            autoHeight
            rows={allTrips ?? []}
            columns={columns}
          />
        </Box>
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

export default PostsPage;
