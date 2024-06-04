"use client";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { baseApi } from "@/redux/api/baseApi";
import { useAppDispatch } from "@/redux/hooks";
import { tagTypes } from "@/redux/tag-types";
import { userRegister } from "@/services/actions/userRegister";
import { storeUserInfo } from "@/services/auth.services";
import { ErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const validationSchema = z.object({
  userName: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

export const defaultValues = {
  userName: "",
  password: "",
  email: "",
};

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Handle Register
  const handleRegister = async (values: FieldValues) => {
    try {
      const res = await userRegister(values);
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
    } catch (error: ErrorResponse | any) {
      if (error.data) {
        const errorMessage: string = error.data.errorSources.reduce(
          (acc: string, errorSource: Record<string, any>) =>
            acc + (acc ? " " : "") + errorSource.message,
          ""
        );

        toast.error(errorMessage);
      } else {
        toast.error("Fail to register user");
      }
    }
  };

  return (
    <PHForm
      onSubmit={handleRegister}
      resolver={zodResolver(validationSchema)}
      defaultValues={defaultValues}
    >
      <Grid container spacing={2} my={1}>
        <Grid item md={12}>
          <PHInput name="userName" label="User Name" fullWidth={true} />
        </Grid>
        <Grid item md={6}>
          <PHInput label="Email" type="email" fullWidth={true} name="email" />
        </Grid>
        <Grid item md={6}>
          <PHInput
            label="Password"
            type="password"
            fullWidth={true}
            name="password"
          />
        </Grid>
      </Grid>
      <Button
        sx={{
          margin: "10px 0px",
        }}
        fullWidth={true}
        type="submit"
      >
        Register
      </Button>
      <Typography component="p" fontWeight={300}>
        Do you already have an account? <Link href="/login">Login</Link>
      </Typography>
    </PHForm>
  );
};

export default RegisterForm;
