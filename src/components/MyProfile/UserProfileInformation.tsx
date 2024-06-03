import { TUser } from "@/types";
import { Box, Stack, styled, Typography } from "@mui/material";

type TProps = {
  data: TUser;
};

const StyledInformationBox = styled(Box)(({ theme }) => ({
  background: "#f4f7fe",
  borderRadius: theme.spacing(1),
  width: "45%",
  padding: "8px 16px",
  "& p": {
    fontWeight: 600,
  },
}));

const UserProfileInformation = ({ data }: TProps) => {
  return (
    <>
      <Typography variant="h5" color="primary.main" mb={2}>
        Personal Information
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} gap={2} flexWrap={"wrap"}>
        {/* Name */}
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Name
          </Typography>
          <Typography>{data?.userName}</Typography>
        </StyledInformationBox>
        {/* Email */}
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Email
          </Typography>
          <Typography>{data?.email}</Typography>
        </StyledInformationBox>
        {/* Role */}
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Role
          </Typography>
          <Typography>{data?.role}</Typography>
        </StyledInformationBox>
        {/*Account Status */}
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Account Status
          </Typography>
          <Typography>{data?.status}</Typography>
        </StyledInformationBox>
      </Stack>
    </>
  );
};

export default UserProfileInformation;
