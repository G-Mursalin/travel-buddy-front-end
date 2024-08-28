'use client';

import ProfileUpdateModal from '@/components/MyProfile/ProfileUpdateModal';
import UserProfileInformation from '@/components/MyProfile/UserProfileInformation';
import Spinner from '@/components/Shared/Spinner/Spinner';
import { useGetMyProfileQuery } from '@/redux/api/userApi';
import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';

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
              <UserProfileInformation
                data={data?.data}
                setIsModalOpen={setIsModalOpen}
              />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default MyProfilePage;
