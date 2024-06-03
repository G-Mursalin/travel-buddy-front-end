"use client";

import ProfileUpdateModal from "@/components/MyProfile/ProfileUpdateModal";
import UserProfileInformation from "@/components/MyProfile/UserProfileInformation";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Button, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";

const MyProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isFetching } = useGetMyProfileQuery(undefined);

  if (isFetching) {
    <p>Loading...</p>;
  }

  return (
    <>
      <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        data={data?.data}
      />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid xs={24} md={12}>
            <UserProfileInformation data={data?.data} />
          </Grid>
        </Grid>
        <Button
          sx={{ marginTop: "20px" }}
          endIcon={<ModeEditIcon />}
          onClick={() => setIsModalOpen(true)}
        >
          Edit Profile
        </Button>
      </Container>
    </>
  );
};

export default MyProfilePage;
