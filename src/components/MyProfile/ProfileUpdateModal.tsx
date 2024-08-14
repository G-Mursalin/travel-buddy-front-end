import TBForm from '@/components/Forms/TBForm';
import TBInput from '@/components/Forms/TBInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';
import PHFullScreenModal from '../Shared/PHModal/PHFullScreenModal';
import { useUpdateMyProfileMutation } from '@/redux/api/userApi';
import { TUser } from '@/types';

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TUser;
};

const validationSchema = z.object({
  userName: z.string(),
  email: z.string(),
  status: z.string(),
  role: z.string(),
});

const ProfileUpdateModal = ({ open, setOpen, data }: TProps) => {
  const [updateMyProfile, { isLoading }] = useUpdateMyProfileMutation();

  const handleUpdateProfile = async (values: FieldValues) => {
    const { userName } = values;

    updateMyProfile({ id: data._id, data: { userName } });

    setOpen(false);
  };

  return (
    <PHFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
      <TBForm
        onSubmit={handleUpdateProfile}
        defaultValues={data}
        resolver={zodResolver(validationSchema)}
      >
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={4}>
            <TBInput
              name="userName"
              label="User Name"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TBInput
              name="email"
              type="email"
              label="Email (You Can't change it)"
              disabled={true}
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TBInput
              name="status"
              label="Status (You Can't change it)"
              disabled={true}
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TBInput
              name="role"
              label="Role (You Can't change it)"
              disabled={true}
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button type="submit" disabled={isLoading}>
          Save
        </Button>
      </TBForm>
    </PHFullScreenModal>
  );
};

export default ProfileUpdateModal;
