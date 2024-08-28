import { useUpdateMyProfileMutation } from '@/redux/api/userApi';
import { TUser } from '@/types';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  styled,
  Typography,
  Divider,
} from '@mui/material';
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInfo,
} from 'next-cloudinary';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  background: '#f4f7fe',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  margin: '0 auto',
  border: `4px solid ${theme.palette.primary.main}`,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

const SectionDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

export type TUserProfileInformationProps = {
  data: TUser;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const UserProfileInformation = ({
  data,
  setIsModalOpen,
}: TUserProfileInformationProps) => {
  const [updateMyProfile, { isLoading }] = useUpdateMyProfileMutation();

  // Handle Image Upload
  const handleUpload = (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info !== 'string') {
      const info: CloudinaryUploadWidgetInfo = result.info;

      updateMyProfile({ data: { profileImage: info.secure_url } });
    } else {
      toast.error('Failed to upload image');
    }
  };

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <StyledAvatar src={data.profileImage} alt={data.userName} />
              <Typography variant="h5" mt={2}>
                {data.userName}
              </Typography>
              <Box mt={2}>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  fullWidth
                  sx={{ mb: 1 }}
                  onClick={() => setIsModalOpen(true)}
                >
                  Edit Profile
                </Button>
                {/* Image Upload To Cloudinary */}
                <CldUploadWidget
                  uploadPreset="travel_buddy"
                  onSuccess={handleUpload}
                >
                  {({ open }) => {
                    function handleOnClick() {
                      open();
                    }
                    return (
                      <Button
                        onClick={handleOnClick}
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                      >
                        Upload Image
                      </Button>
                    );
                  }}
                </CldUploadWidget>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Personal Information
            </Typography>
            <Box mb={2}>
              <SectionTitle variant="subtitle1">Email</SectionTitle>
              <Typography>{data.email}</Typography>
            </Box>
            <SectionDivider />
            <Box mb={2}>
              <SectionTitle variant="subtitle1">Account Status</SectionTitle>
              <Typography>{data.status}</Typography>
            </Box>
            <SectionDivider />
            <Box mb={2}>
              <SectionTitle variant="subtitle1">Bio</SectionTitle>
              <Typography>{data.bio}</Typography>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default UserProfileInformation;
