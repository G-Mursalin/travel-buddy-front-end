"use client";

import { USER_ROLE, UserStatus } from "@/constants/role";
import {
  useChangeUserRoleMutation,
  useChangeUserStatusMutation,
  useGetAllUsersQuery,
} from "@/redux/api/adminApi";
import { TUser, UserRole } from "@/types";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export type TRowData = {
  id: string;
  userName: string;
  email: string;
  status: "in-progress" | "blocked";
  role: UserRole;
};

const UserManagementPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { data, isFetching } = useGetAllUsersQuery(undefined);
  const [changeUserRole, { isLoading }] = useChangeUserRoleMutation();
  const [changeUserStatus, { isLoading: isChangeStatusLoading }] =
    useChangeUserStatusMutation();

  const users = data?.data;

  // Handle Role
  const handleRoleChange = (rowData: TRowData) => {
    changeUserRole({
      id: rowData.id,
      data: {
        role:
          rowData.role === USER_ROLE.USER ? USER_ROLE.ADMIN : USER_ROLE.USER,
      },
    });
  };

  // Handle Status
  const handleStatusChange = (rowData: TRowData) => {
    changeUserStatus({
      id: rowData.id,
      data: {
        status:
          rowData.status === UserStatus[0] ? UserStatus[1] : UserStatus[0],
      },
    });
  };

  useEffect(() => {
    const updateData = users?.map((user: TUser) => {
      return {
        id: user._id,
        userName: user.userName,
        email: user.email,
        status: user.status,
        role: user.role,
      };
    });

    setAllUsers(updateData);
  }, [users]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "User ID", flex: 1 },
    { field: "userName", headerName: "User Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "status", headerName: "Account Status", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
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
              onClick={() => handleRoleChange(row)}
              variant="outlined"
              size="small"
            >
              Change Role
            </Button>
          </Box>
        );
      },
    },
    {
      field: "change-status",
      headerName: "Change Account Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Button
              onClick={() => handleStatusChange(row)}
              variant="outlined"
              size="small"
            >
              Change Status
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      {!isFetching ? (
        <Box my={2}>
          <DataGrid autoHeight rows={allUsers ?? []} columns={columns} />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default UserManagementPage;
