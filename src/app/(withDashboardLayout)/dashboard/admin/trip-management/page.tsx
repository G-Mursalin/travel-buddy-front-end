'use client';

import Spinner from '@/components/Shared/Spinner/Spinner';
import {
  useDeleteTripMutation,
  useGetAllTripsQuery,
} from '@/redux/api/tripApi';
import { ErrorResponse, IMeta, TTrip } from '@/types';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlaceIcon from '@mui/icons-material/Place';
import { Box, Chip, IconButton, Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

type TRow = {
  id: string;
  photo: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelType: string;
  budget: number;
};

const TripManagementPage = () => {
  const [allTrips, setAllTrips] = useState<TRow[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<TRow | null>(null);
  const open = Boolean(anchorEl);

  const query: Record<string, any> = {};

  query['page'] = page;
  query['limit'] = limit;

  const { data, isFetching, isLoading } = useGetAllTripsQuery({ ...query });
  const [deleteTrip] = useDeleteTripMutation();
  const router = useRouter();

  const trips: TTrip[] = data?.data;
  const meta: IMeta = data?.meta;

  const handleClick = (event: React.MouseEvent<HTMLElement>, row: TRow) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row); // Set the selected row when the menu is opened
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null); // Clear the selected row when the menu is closed
  };

  // Handle Delete Post
  const handleDelete = async () => {
    if (selectedRow) {
      try {
        const res = await deleteTrip(selectedRow.id).unwrap();

        toast.success(res.message);
      } catch (error: ErrorResponse | any) {
        if (error.data) {
          const errorMessage: string = error.data.errorSources.reduce(
            (acc: string, errorSource: Record<string, any>) =>
              acc + (acc ? ' ' : '') + errorSource.message,
            ''
          );
          toast.error(errorMessage);
        } else {
          toast.error('Fail to delete');
        }
      } finally {
        handleClose(); // Close the menu after performing the delete action
      }
    }
  };

  // Handle Edit Post
  const handleEdit = () => {
    if (selectedRow) {
      router.push(`/dashboard/admin/trip-management/${selectedRow.id}`);
      handleClose(); // Close the menu after performing the edit action
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
        photo: data.photos[0].image,
        title: data.title,
        destination: data.destination,
        startDate: new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        }).format(new Date(data.startDate)),
        endDate: new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        }).format(new Date(data.endDate)),
        travelType: data.travelType,
        budget: data.budget,
      };
    });

    setAllTrips(updateData);
  }, [trips]);

  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Image',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box display="flex" alignItems="center" width="100%" height="100%">
            <Image
              src={row.photo}
              width={45}
              height={45}
              alt={`${row.id}-image`}
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                width: '45px',
                height: '45px',
              }}
            />
          </Box>
        );
      },
    },
    { field: 'title', headerName: 'Title', flex: 1 },
    {
      field: 'destination',
      headerName: 'Destination',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Chip
            icon={<PlaceIcon />}
            label={row.destination}
            variant="outlined"
            size="small"
            title={row.destination}
          />
        );
      },
    },
    { field: 'startDate', headerName: 'Start Date', flex: 1 },
    { field: 'endDate', headerName: 'End Date', flex: 1 },
    {
      field: 'travelType',
      headerName: 'Travel Type',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Chip
            label={row.travelType}
            color="primary"
            variant="outlined"
            size="small"
          />
        );
      },
    },
    {
      field: 'budget',
      headerName: 'Budget',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Chip icon={<AttachMoneyIcon />} label={row.budget} size="small" />
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => {
        return (
          <Box>
            <IconButton
              aria-label="more"
              id={row.id}
              aria-haspopup="true"
              onClick={(event) => handleClick(event, row)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id={row.id}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEdit} disableRipple sx={{ gap: 1 }}>
                <EditIcon />
                Edit
              </MenuItem>
              <MenuItem onClick={handleDelete} disableRipple sx={{ gap: 1 }}>
                <DeleteIcon />
                Delete
              </MenuItem>
            </Menu>
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
            slots={{
              footer: () => {
                return (
                  <Box
                    sx={{
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center',
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
        <Spinner />
      )}
    </Box>
  );
};

export default TripManagementPage;
