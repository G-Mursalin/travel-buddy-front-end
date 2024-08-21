'use client';

import TBForm from '@/components/Forms/TBForm';
import TBInput from '@/components/Forms/TBInput';
import TBSelectField from '@/components/Forms/TBSelectField';
import { useGetTripQuery, useUpdateTripMutation } from '@/redux/api/tripApi';
import { ErrorResponse, TJwtPayload, TTrip } from '@/types';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FieldValues } from 'react-hook-form';
import { Button, Grid } from '@mui/material';
import { travelTypes } from '@/constants/travelTypes';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { getUserInfo } from '@/services/auth.services';
import { USER_ROLE } from '@/constants/role';
import Spinner from '../Spinner/Spinner';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const tripValidationSchema = z.object({
  destination: z.string().min(1, { message: 'Destination cannot be empty' }),
  description: z.string().min(1, { message: 'Description cannot be empty' }),
  startDate: z
    .string()
    .regex(dateRegex, {
      message: 'Invalid startDate format. Use YYYY-MM-DD',
    })
    .refine(
      (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      },
      { message: 'Invalid startDate value' }
    ),
  endDate: z
    .string()
    .regex(dateRegex, {
      message: 'Invalid endDate format. Use YYYY-MM-DD',
    })
    .refine(
      (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      },
      { message: 'Invalid endDate value' }
    ),
  budget: z.string().min(1, { message: 'Budget cannot be empty' }),
  travelType: z.enum([...travelTypes] as [string, ...string[]], {
    required_error: 'Travel Types is required',
    invalid_type_error:
      'Travel Types must be one of: adventure or leisure or business',
  }),
  photo: z
    .string()
    .url({ message: 'Invalid photo URL' })
    .min(1, { message: 'Photo URL cannot be empty' }),
});

const EditPost = ({ id }: { id: string }) => {
  const [userRole, setUserRole] = useState('');
  const { data, isLoading, isFetching, refetch } = useGetTripQuery(id);
  const [updateTrip] = useUpdateTripMutation();
  const router = useRouter();

  // Handle Submit Form
  const handleFormSubmit = async (values: FieldValues) => {
    try {
      const res = await updateTrip({
        id: trip._id,
        data: { ...values, budget: Number(values.budget) },
      }).unwrap();

      toast.success(res.message);
      refetch();

      // Redirect Users
      if (userRole === USER_ROLE.USER) {
        router.push('/dashboard/posts');
      }
      if (userRole === USER_ROLE.ADMIN) {
        router.push('/dashboard/admin/trip-management');
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
        toast.error('Fail to update');
      }
    }
  };

  useEffect(() => {
    const user = getUserInfo() as TJwtPayload;

    if (!user) {
      return router.push('/login');
    }

    setUserRole(user.role);
  }, [router]);

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  const trip: TTrip = data?.data;

  if (!trip) {
    return <p>No trip details found.</p>;
  }

  return (
    <TBForm
      onSubmit={handleFormSubmit}
      defaultValues={{ ...trip, budget: String(trip.budget) }}
      resolver={zodResolver(tripValidationSchema)}
    >
      <Grid container spacing={2} sx={{ my: 5 }}>
        <Grid item xs={12} sm={12} md={4}>
          <TBInput
            name="destination"
            label="Destination"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TBInput
            name="description"
            label="Description"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <TBInput
            name="startDate"
            label="Start Date"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <TBInput
            name="endDate"
            label="End Date"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TBInput
            name="budget"
            type="number"
            label="Budget"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TBSelectField
            items={travelTypes}
            name="travelType"
            label="Travel Type"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TBInput
            name="photo"
            label="Photo URL"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>

      <Button disabled={isLoading} type="submit">
        Update
      </Button>
    </TBForm>
  );
};

export default EditPost;
