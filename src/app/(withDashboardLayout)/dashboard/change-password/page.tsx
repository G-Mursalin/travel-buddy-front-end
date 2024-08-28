'use client';

import TBForm from '@/components/Forms/TBForm';
import TBInput from '@/components/Forms/TBInput';
import { StyledPaper } from '@/components/MyProfile/UserProfileInformation';
import { useChangePasswordMutation } from '@/redux/api/authApi';
import { logoutUser } from '@/services/actions/logOutUser';
import { ErrorResponse } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import KeyIcon from '@mui/icons-material/Key';
import { Box, Button, Grid, Stack, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const validationSchema = z.object({
  oldPassword: z.string().min(6, 'Must be at least 6 characters long'),
  newPassword: z.string().min(6, 'Must be at least 6 characters long'),
});

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();

  // Handle Change Password
  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await changePassword(values).unwrap();

      toast.success('Password Changed Successfully. Please login again');
      logoutUser(router);
    } catch (error: ErrorResponse | any) {
      if (error.data) {
        const errorMessage: string = error.data.errorSources.reduce(
          (acc: string, errorSource: Record<string, any>) =>
            acc + (acc ? ' ' : '') + errorSource.message,
          ''
        );
        toast.error(errorMessage);
      } else {
        toast.error('Fail to change password');
      }
    }
  };

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Stack alignItems="center" justifyContent="center">
          <Box
            sx={{
              '& svg': {
                width: 100,
                height: 100,
              },
            }}
          >
            <KeyIcon sx={{ color: 'primary.main' }} />
          </Box>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 2, mt: -1.5 }}>
            Change password
          </Typography>
        </Stack>
        <TBForm
          onSubmit={onSubmit}
          defaultValues={{ oldPassword: '', newPassword: '' }}
          resolver={zodResolver(validationSchema)}
        >
          <Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TBInput
                name="oldPassword"
                type="password"
                label="Old Password"
                fullWidth
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TBInput
                name="newPassword"
                type="password"
                label="New Password"
                fullWidth
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Button type="submit" sx={{ width: '100%', my: 2 }}>
            change Password
          </Button>
        </TBForm>
      </StyledPaper>
    </Container>
  );
};

export default ChangePassword;
