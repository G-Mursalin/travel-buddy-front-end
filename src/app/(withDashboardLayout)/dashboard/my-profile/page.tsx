"use client";

import ProfileUpdateModal from "@/components/MyProfile/ProfileUpdateModal";
import UserProfileInformation from "@/components/MyProfile/UserProfileInformation";
import Spinner from "@/components/Shared/Spinner/Spinner";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { useState } from "react";

const MyProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isFetching, isLoading } = useGetMyProfileQuery(undefined);

  if (isFetching || isLoading) {
    <Spinner />;
  }

  return (
    <>
      <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        data={data?.data}
      />
      {!isFetching || !isLoading ? (
        <Container sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid xs={24} md={12}>
              <UserProfileInformation data={data?.data} />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Link href="/dashboard/change-password" passHref>
              <Typography
                component="a"
                sx={{
                  textDecoration: "underline",
                  color: "primary.main",
                  cursor: "pointer",
                  display: "inline-block",
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
              >
                Change Password
              </Typography>
            </Link>
          </Box>
          <Box>
            <Button
              sx={{ marginTop: "20px" }}
              endIcon={<ModeEditIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </Button>
          </Box>
        </Container>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default MyProfilePage;
