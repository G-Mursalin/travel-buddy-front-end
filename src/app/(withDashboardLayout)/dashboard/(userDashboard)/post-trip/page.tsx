"use client";

import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHSelectField from "@/components/Forms/PHSelectField";
import { travelType } from "@/constants/trip";
import { useCreateTripMutation } from "@/redux/api/tripApi";
import { ErrorResponse } from "@/types";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const tripValidationSchema = z.object({
  destination: z.string().min(1, { message: "Destination cannot be empty" }),
  description: z.string().min(1, { message: "Description cannot be empty" }),
  startDate: z
    .string()
    .regex(dateRegex, {
      message: "Invalid startDate format. Use YYYY-MM-DD",
    })
    .refine(
      (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      },
      { message: "Invalid startDate value" }
    ),
  endDate: z
    .string()
    .regex(dateRegex, {
      message: "Invalid endDate format. Use YYYY-MM-DD",
    })
    .refine(
      (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      },
      { message: "Invalid endDate value" }
    ),
  budget: z.string(),
  travelType: z.enum([...travelType] as [string, ...string[]], {
    required_error: "Travel Types is required",
    invalid_type_error:
      "Travel Types must be one of: adventure or leisure or business",
  }),
  photo: z
    .string()
    .url({ message: "Invalid photo URL" })
    .min(1, { message: "Photo URL cannot be empty" }),
});

const PostTrpPage = () => {
  const [createTrip, { isLoading }] = useCreateTripMutation();

  // Handle Submit Form
  const handleFormSubmit = async (values: FieldValues) => {
    try {
      const res = await createTrip({
        ...values,
        budget: Number(values.budget),
      }).unwrap();

      toast.success(res.message);
    } catch (error: ErrorResponse | any) {
      if (error.data) {
        const errorMessage: string = error.data.errorSources.reduce(
          (acc: string, errorSource: Record<string, any>) =>
            acc + (acc ? " " : "") + errorSource.message,
          ""
        );
        toast.error(errorMessage);
      } else {
        toast.error("Fail to create post");
      }
    }
  };

  // Default Values
  const defaultValues = {
    destination: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelType: "",
    photo:
      "https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/o1hw7clo5gqkvx77fznt",
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
          <PHInput
            name="startDate"
            label="Start Date"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <PHInput
            name="endDate"
            label="End Date"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
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
          <PHInput
            name="photo"
            label="Photo URL"
            fullWidth={true}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>

      <Button disabled={isLoading} type="submit">
        Create
      </Button>
    </PHForm>
  );
};

export default PostTrpPage;
