'use client';

import TBForm from '@/components/Forms/TBForm';
import TBInput from '@/components/Forms/TBInput';
import Spinner from '@/components/Shared/Spinner/Spinner';
import { useGetTripQuery } from '@/redux/api/tripApi';
import { useCreateTripRequestMutation } from '@/redux/api/tripRequestApi';
import { useGetMyProfileQuery } from '@/redux/api/userApi';
import { ErrorResponse, TTrip, TUser } from '@/types';
import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type TParams = {
  params: {
    tripId: string;
  };
};

const TripRequestPage = ({ params }: TParams) => {
  const id = params?.tripId;
  // State for agreement checkbox
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();
  const {
    data: tripData,
    isLoading: isTripLoading,
    isFetching: isTripFetching,
  } = useGetTripQuery(id);

  const {
    data: userData,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useGetMyProfileQuery(undefined);

  const [createTripRequest] = useCreateTripRequestMutation();

  // Handle Trip Request
  const handleTripRequest = async () => {
    try {
      const res = await createTripRequest({
        userId: user._id,
        tripId: trip._id,
      }).unwrap();

      toast.success(res.message);
      router.push('/dashboard/trip-requested-history');
    } catch (error: ErrorResponse | any) {
      if (error.data) {
        const errorMessage: string = error.data.errorSources.reduce(
          (acc: string, errorSource: Record<string, any>) =>
            acc + (acc ? ' ' : '') + errorSource.message,
          ''
        );
        toast.error(errorMessage);
      } else {
        toast.error('Fail to send request');
      }
    }
  };

  if (isTripLoading || isTripFetching || isUserLoading || isUserFetching) {
    return <Spinner />;
  }

  const trip: TTrip = tripData?.data;
  const user: TUser = userData?.data;

  return (
    <>
      <TBForm onSubmit={handleTripRequest} defaultValues={{ ...user, ...trip }}>
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={4}>
            <TBInput
              name="userName"
              label="User Name (You Can't change it)"
              disabled={true}
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
              name="destination"
              label="Destination (You Can't change it)"
              disabled={true}
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TBInput
              name="description"
              label="Description (You Can't change it)"
              disabled={true}
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TBInput
              name="startDate"
              label="Start Date (You Can't change it)"
              disabled={true}
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TBInput
              name="endDate"
              label="End Date (You Can't change it)"
              disabled={true}
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TBInput
              name="travelType"
              label="Travel Type (You Can't change it)"
              disabled={true}
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TBInput
              name="budget"
              label="Budget (You Can't change it)"
              disabled={true}
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
        </Grid>
        {/* Aggrement Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
          }
          label="Agreement to terms and conditions"
        />
        <Button type="submit" disabled={!agreed}>
          Send Request
        </Button>
      </TBForm>
    </>
  );
};

export default TripRequestPage;
