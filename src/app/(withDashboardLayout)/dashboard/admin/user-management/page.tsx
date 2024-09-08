'use client';

import Spinner from '@/components/Shared/Spinner/Spinner';
import { USER_ROLE, UserStatus } from '@/constants/role';
import {
  useChangeUserRoleMutation,
  useChangeUserStatusMutation,
  useGetAllUsersQuery,
} from '@/redux/api/adminApi';
import { getUserInfo } from '@/services/auth.services';
import { ErrorResponse, TUser, UserRole } from '@/types';
import BlockIcon from '@mui/icons-material/Block';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { Box, Chip, IconButton, Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export type TRowData = {
  id: string;
  userName: string;
  email: string;
  status: 'in-progress' | 'blocked';
  role: UserRole;
  profileImage: string;
};

const UserManagementPage = () => {
  const [allUsers, setAllUsers] = useState<TRowData[] | []>([]);
  const { data, isFetching } = useGetAllUsersQuery(undefined);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<TRowData | null>(null);
  const open = Boolean(anchorEl);
  const [changeUserRole] = useChangeUserRoleMutation();
  const [changeUserStatus] = useChangeUserStatusMutation();

  const loginUser = getUserInfo();

  const users: TUser[] = data?.data;

  const handleClick = (event: React.MouseEvent<HTMLElement>, row: TRowData) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row); // Set the selected row when the menu is opened
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null); // Clear the selected row when the menu is closed
  };

  // Handle Role Change
  const handleRoleChange = async () => {
    if (selectedRow) {
      try {
        const res = await changeUserRole({
          id: selectedRow.id,
          data: {
            role:
              selectedRow.role === USER_ROLE.USER
                ? USER_ROLE.ADMIN
                : USER_ROLE.USER,
          },
        }).unwrap();

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
          toast.error('Fail to change role');
        }
      } finally {
        handleClose(); // Close the menu after performing the delete action
      }
    }
  };

  // Handle Status Change
  const handleStatusChange = async () => {
    if (selectedRow) {
      try {
        const res = await changeUserStatus({
          id: selectedRow.id,
          data: {
            status:
              selectedRow.status === UserStatus[0]
                ? UserStatus[1]
                : UserStatus[0],
          },
        }).unwrap();

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
          toast.error('Fail to change status');
        }
      } finally {
        handleClose(); // Close the menu after performing the delete action
      }
    }
  };

  useEffect(() => {
    const updateData = users?.map((user: TUser) => {
      return {
        id: user._id,
        userName: user.userName,
        email: user.email,
        status: user.status,
        role: user.role,
        profileImage: user.profileImage,
      };
    });

    setAllUsers(updateData);
  }, [users]);

  const columns: GridColDef[] = [
    {
      field: 'user-profile-image',
      headerName: 'User Profile Image',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box display="flex" alignItems="center" width="100%" height="100%">
            <Image
              src={row.profileImage}
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
    { field: 'userName', headerName: 'User Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'status',
      headerName: 'Account Status',
      flex: 1,
      renderCell: ({ row }: { row: TRowData }) => {
        return (
          <Chip
            title={row.status}
            label={row.status}
            color="primary"
            icon={
              row.status === UserStatus[0] ? <CheckCircleIcon /> : <BlockIcon />
            }
            variant={row.status === UserStatus[0] ? 'outlined' : 'filled'}
            size="small"
          />
        );
      },
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      renderCell: ({ row }: { row: TRowData }) => {
        return (
          <Chip
            title={row.role}
            icon={
              row.role === USER_ROLE.ADMIN ? (
                <ManageAccountsIcon />
              ) : (
                <PersonIcon />
              )
            }
            label={row.role.charAt(0).toUpperCase() + row.role.slice(1)}
            size="small"
          />
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }: { row: TRowData }) => {
        if (row.id === loginUser?.id) return;
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
              <MenuItem
                onClick={handleRoleChange}
                disableRipple
                sx={{ gap: 1 }}
              >
                <ChangeCircleIcon />
                Change Role
              </MenuItem>
              <MenuItem
                onClick={handleStatusChange}
                disableRipple
                sx={{ gap: 1 }}
              >
                <PublishedWithChangesIcon />
                Change Status
              </MenuItem>
            </Menu>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      {!isFetching ? (
        <Box my={2}>
          <DataGrid
            autoHeight
            hideFooterPagination
            rows={allUsers ?? []}
            columns={columns}
            rowSelection={false}
          />
        </Box>
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

export default UserManagementPage;
