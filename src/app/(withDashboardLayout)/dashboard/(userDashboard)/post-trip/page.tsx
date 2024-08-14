'use client';

import PHForm from '@/components/Forms/PHForm';
import PHInput from '@/components/Forms/PHInput';
import PHSelectField from '@/components/Forms/PHSelectField';
import TBDatePicker from '@/components/Forms/TBDatePicker';
import { travelType } from '@/constants/trip';
import { useCreateTripMutation } from '@/redux/api/tripApi';
import { ErrorResponse } from '@/types';
import { dateFormatter } from '@/utils/dateFormatter';
import { zodResolver } from '@hookform/resolvers/zod';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Grid } from '@mui/material';
import dayjs from 'dayjs';
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const tripValidationSchema = z.object({
  destination: z.string().min(1, { message: 'Destination cannot be empty' }),
  description: z.string().min(1, { message: 'Description cannot be empty' }),
  startDate: z.any().refine((date) => dayjs.isDayjs(date) && date.isValid(), {
    message: 'Please select startDate',
  }),
  endDate: z.any().refine((date) => dayjs.isDayjs(date) && date.isValid(), {
    message: 'Please select endDate',
  }),
  budget: z.string().min(1, { message: 'Budget cannot be empty' }),
  travelType: z.enum([...travelType] as [string, ...string[]], {
    required_error: 'Travel Types is required',
    invalid_type_error:
      'Travel Types must be one of: adventure or leisure or business',
  }),
});

const PostTrpPage = () => {
  const [createTrip, { isLoading }] = useCreateTripMutation();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const router = useRouter();

  // Handle Submit Form
  const handleFormSubmit = async (values: FieldValues) => {
    // Modified the values as backend accepted
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.budget = Number(values.budget);
    values.photos = uploadedImages.map((val, i) => ({ id: i, image: val }));

    try {
      const res = await createTrip(values).unwrap();
      toast.success(res.message);
      router.push('/dashboard/trips');
    } catch (error: ErrorResponse | any) {
      if (error.data) {
        const errorMessage: string = error.data.errorSources.reduce(
          (acc: string, errorSource: Record<string, any>) =>
            acc + (acc ? ' ' : '') + errorSource.message,
          ''
        );
        toast.error(errorMessage);
      } else {
        toast.error('Fail to create post');
      }
    }
  };

  // Default Values
  const defaultValues = {
    destination: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    travelType: '',
    photo: [],
  };

  return (
    <PHForm
      onSubmit={handleFormSubmit}
      defaultValues={defaultValues}
      resolver={zodResolver(tripValidationSchema)}
    >
      <Grid container spacing={2} sx={{ my: 5 }}>
        <Grid item xs={12} sm={12} md={4}>
          <PHInput
            name="destination"
            label="Destination"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <PHInput
            name="description"
            label="Description"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <TBDatePicker name="startDate" label="Start Date" />
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <TBDatePicker name="endDate" label="End Date" />
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <PHInput
            name="budget"
            type="number"
            label="Budget"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <PHSelectField
            items={travelType}
            name="travelType"
            label="Travel Type"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <CldUploadWidget
            uploadPreset="travel_buddy"
            onSuccess={(result: CloudinaryUploadWidgetResults) => {
              if (result.info && typeof result.info !== 'string') {
                const info: CloudinaryUploadWidgetInfo = result.info;
                const newImageUrl = info.secure_url;
                setUploadedImages((prev) => [...prev, newImageUrl]);
              } else {
                toast.error('Fail to upload image');
              }
            }}
          >
            {({ open }) => {
              function handleOnClick() {
                open();
              }
              return (
                <Button
                  onClick={handleOnClick}
                  component="label"
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Images
                </Button>
              );
            }}
          </CldUploadWidget>
        </Grid>
      </Grid>

      <Button disabled={isLoading} type="submit">
        Create
      </Button>
    </PHForm>
  );
};

export default PostTrpPage;
