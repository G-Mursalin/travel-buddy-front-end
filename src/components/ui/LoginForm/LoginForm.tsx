'use client';

import PHForm from '@/components/Forms/PHForm';
import PHInput from '@/components/Forms/PHInput';
import { baseApi } from '@/redux/api/baseApi';
import { useAppDispatch } from '@/redux/hooks';
import { tagTypes } from '@/redux/tag-types';
import { userLogin } from '@/services/actions/userLogin';
import { storeUserInfo } from '@/services/auth.services';
import { ErrorResponse } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const validationSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Must be at least 6 characters'),
});

const defaultValues = { email: '', password: '' };

const LoginForm = () => {
  const dispatch = useAppDispatch();
  // Handle Login
  const handleLoginSubmit = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);
      if (res && res.data) {
        if (res?.data?.accessToken) {
          toast.success(res.message);
          storeUserInfo({ accessToken: res?.data?.accessToken });

          // Invalidate Tags
          dispatch(
            baseApi.util.invalidateTags([
              tagTypes.user,
              tagTypes.users,
              tagTypes.tripRequest,
              tagTypes.trip,
            ])
          );
        }
      }
    } catch (error: ErrorResponse | any) {
      if (error.data) {
        const errorMessage: string = error.data.errorSources.reduce(
          (acc: string, errorSource: Record<string, any>) =>
            acc + (acc ? ' ' : '') + errorSource.message,
          ''
        );
        toast.error(errorMessage);
      } else {
        toast.error('Invalid Email or Password');
      }
    }
  };

  return (
    <PHForm
      onSubmit={handleLoginSubmit}
      resolver={zodResolver(validationSchema)}
      defaultValues={defaultValues}
    >
      <Box
        sx={{
          border: '1px solid red',
          padding: '8px',
          marginBottom: '16px',
        }}
      >
        Admin Role:
        <p> Email: admin@gmail.com</p>
        <p>password: 123456</p>
        User Role:
        <p> Email: user@gmail.com</p>
        <p>password: 123456</p>
      </Box>
      <Grid container spacing={2} my={1}>
        <Grid item md={6}>
          <PHInput name="email" label="Email" type="email" fullWidth={true} />
        </Grid>
        <Grid item md={6}>
          <PHInput
            name="password"
            label="Password"
            type="password"
            fullWidth={true}
          />
        </Grid>
      </Grid>

      <Typography mb={1} textAlign="end" component="p" fontWeight={300}>
        Forgot Password?
      </Typography>

      <Button
        sx={{
          margin: '10px 0px',
        }}
        fullWidth={true}
        type="submit"
      >
        Login
      </Button>
      <Typography component="p" fontWeight={300}>
        Don&apos;t have an account?
        <Link href="/register">Create an account</Link>
      </Typography>
    </PHForm>
  );
};

export default LoginForm;
