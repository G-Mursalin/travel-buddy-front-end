'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid } from '@mui/material';
import dayjs from 'dayjs';
import { z } from 'zod';
import TBForm from '@/components/Forms/TBForm';
import TBInput from '@/components/Forms/TBInput';
import TBDatePicker from '@/components/Forms/TBDatePicker';
import TBSelectField from '@/components/Forms/TBSelectField';
import TBImageUploader from '@/components/Forms/TBImageUploader';
import { travelTypes } from '@/constants/travelTypes';
import { dateTimeUtils } from '@/utils/dateTimeUtils';
import { ErrorResponse, TTrip } from '@/types';
import { USER_ROLE } from '@/constants/role';
// Dynamically import TBRichTextEditor with SSR disabled
const TBRichTextEditor = dynamic(
  () => import('@/components/Forms/TBRichTextEditor'),
  { ssr: false }
);

// Zod Schema
const tripValidationSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: 'Title cannot be empty' })
      .max(50, { message: 'Title must be at most 50 characters long' }),
    destination: z
      .string()
      .min(1, { message: 'Destination cannot be empty' })
      .max(20, { message: 'Destination must be at most 20 characters long' }),
    description: z.string().min(1, { message: 'Description cannot be empty' }),
    startDate: z.any().refine((date) => dayjs.isDayjs(date) && date.isValid(), {
      message: 'Please select a valid start date',
    }),
    endDate: z.any().refine((date) => dayjs.isDayjs(date) && date.isValid(), {
      message: 'Please select a valid end date',
    }),
    numberOfBookingSpot: z
      .string()
      .min(1, { message: 'Number of booking spot cannot be empty' })
      .refine((value) => parseInt(value) >= 0, {
        message: 'Number of booking spot must be a non-negative number',
      }),
    maxNumberOfPeople: z
      .string()
      .min(1, { message: 'Max number of people cannot be empty' })
      .refine((value) => parseInt(value) >= 0, {
        message: 'Max number of people must be a non-negative number',
      }),
    budget: z
      .string()
      .min(1, { message: 'Budget cannot be empty' })
      .refine((value) => parseFloat(value) >= 0, {
        message: 'Budget must be a non-negative number',
      }),
    travelType: z.enum([...travelTypes] as [string, ...string[]], {
      required_error: 'Travel Type is required',
      invalid_type_error:
        'Travel Types must be one of: Adventure or Relaxation or Cultural or Family or Business',
    }),
    photos: z
      .array(
        z.object({
          id: z
            .number()
            .nonnegative({ message: 'ID must be a non-negative number' }),
          image: z.string().url({ message: 'Invalid image URL' }),
        })
      )
      .max(3, { message: 'You can only upload up to 3 images' })
      .min(1, { message: 'You must upload at least 1 image' }),
  })
  .refine(
    ({ startDate, endDate }) => dayjs(endDate).isAfter(dayjs(startDate)),
    {
      message: 'End date must be after the start date',
      path: ['endDate'],
    }
  );

type TEditOrPostTripProps = {
  initialData?: TTrip;
  onSubmit: (values: FieldValues) => Promise<any>;
  isLoading: boolean;
  mode: 'edit' | 'post';
};

const EditOrPostTrip = ({
  initialData,
  onSubmit,
  isLoading,
  mode,
}: TEditOrPostTripProps) => {
  const router = useRouter();

  // Handle Submit Form
  const handleFormSubmit = async (values: FieldValues) => {
    // Modified the values as backend accepted
    values.startDate = dateTimeUtils.dateFormatter(values.startDate);
    values.endDate = dateTimeUtils.dateFormatter(values.endDate);
    values.maxNumberOfPeople = Number(values.maxNumberOfPeople);
    values.budget = Number(values.budget);
    values.numberOfBookingSpot = Number(values.numberOfBookingSpot);

    try {
      await onSubmit(values);
      toast.success(
        mode === 'edit'
          ? 'Trip updated successfully'
          : 'Trip created successfully'
      );
      if (mode === 'edit') {
        if (initialData?.user.role === USER_ROLE.USER) {
          router.push('/dashboard/posts');
        } else if (initialData?.user.role === USER_ROLE.ADMIN) {
          router.push('/dashboard/admin/trip-management');
        }
      } else {
        router.push('/all-trip');
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
        toast.error(
          mode === 'edit' ? 'Failed to update trip' : 'Failed to create trip'
        );
      }
    }
  };

  // Default Values
  const defaultValues = initialData
    ? {
        ...initialData,
        budget: String(initialData.budget),
        maxNumberOfPeople: String(initialData.maxNumberOfPeople),
        numberOfBookingSpot: String(initialData.numberOfBookingSpot),
        startDate: dayjs(initialData.startDate),
        endDate: dayjs(initialData.endDate),
      }
    : {
        title: '',
        destination: '',
        description: '',
        startDate: '',
        endDate: '',
        numberOfBookingSpot: '',
        maxNumberOfPeople: '',
        budget: '',
        travelType: '',
        photos: [],
      };

  return (
    <TBForm
      onSubmit={handleFormSubmit}
      defaultValues={defaultValues}
      resolver={zodResolver(tripValidationSchema)}
    >
      <Grid container spacing={3} sx={{ my: 5 }}>
        {/* Title */}
        <Grid item xs={12} sm={12} md={6}>
          <TBInput
            name="title"
            label="Trip Title"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>

        {/* Destination */}
        <Grid item xs={12} sm={12} md={6}>
          <TBInput
            name="destination"
            label="Destination / Location"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>

        {/* Max Number of people can come with */}
        <Grid item xs={12} sm={6} md={4}>
          <TBInput
            name="maxNumberOfPeople"
            type="number"
            label="Max Number of People Can Come With"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>

        {/* Budget */}
        <Grid item xs={12} sm={6} md={4}>
          <TBInput
            name="budget"
            type="number"
            label="Budget"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>

        {/* Travel Types */}
        <Grid item xs={12} sm={6} md={4}>
          <TBSelectField
            items={travelTypes}
            name="travelType"
            label="Travel Type"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>

        {/* Start Date */}
        <Grid item xs={12} sm={6} md={4}>
          <TBDatePicker name="startDate" label="Start Date" fullWidth />
        </Grid>

        {/* End Date */}
        <Grid item xs={12} sm={6} md={4}>
          <TBDatePicker name="endDate" label="End Date" fullWidth />
        </Grid>

        {/* Total Spots Can be Booked */}
        <Grid item xs={12} sm={6} md={4}>
          <TBInput
            name="numberOfBookingSpot"
            type="number"
            label="Maximum Booking Spot"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TBRichTextEditor
            name="description"
            placeholder="Enter trip description here..."
            required={true}
          />
        </Grid>

        {/* Upload Images */}
        {mode === 'post' && (
          <Grid item xs={12} md={6}>
            <TBImageUploader
              name="photos"
              uploadPreset="travel_buddy"
              label="Upload Trip Images"
              fullWidth
              maxUploads={3}
            />
          </Grid>
        )}

        {/* Submit Button */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button disabled={isLoading} type="submit">
              {mode === 'edit' ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </TBForm>
  );
};

export default EditOrPostTrip;
