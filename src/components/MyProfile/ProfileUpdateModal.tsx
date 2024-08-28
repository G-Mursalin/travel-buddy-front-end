import TBForm from '@/components/Forms/TBForm';
import TBInput from '@/components/Forms/TBInput';
import { useUpdateMyProfileMutation } from '@/redux/api/userApi';
import { TUser } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EmailOutlined,
  InfoOutlined,
  LockOutlined,
  PersonOutline,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';
import PHFullScreenModal from '../Shared/PHModal/PHFullScreenModal';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(4px)',
  borderRadius: theme.shape.borderRadius * 2,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  margin: '0 auto',
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: `0 0 0 4px ${theme.palette.background.paper}`,
}));

const InputWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.primary.main,
}));

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TUser;
};

const validationSchema = z.object({
  userName: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(200, 'Bio must be 200 characters or less'),
  status: z.string(),
  role: z.string(),
});

const ProfileUpdateModal = ({ open, setOpen, data }: TProps) => {
  const [updateMyProfile, { isLoading }] = useUpdateMyProfileMutation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleUpdateProfile = async (values: FieldValues) => {
    const { userName, bio } = values;

    await updateMyProfile({ data: { userName, bio } });

    setOpen(false);
  };

  return (
    <PHFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
      <StyledPaper elevation={3}>
        <Grid
          container
          spacing={4}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Grid item xs={12} md={4}>
            <Box textAlign="center" mb={3}>
              <StyledAvatar src={data?.profileImage} alt={data?.userName} />
              <Typography variant="h5" mt={2}>
                {data?.userName}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <TBForm
              onSubmit={handleUpdateProfile}
              defaultValues={data}
              resolver={zodResolver(validationSchema)}
            >
              <InputWrapper>
                <IconWrapper>
                  <PersonOutline />
                </IconWrapper>
                <TBInput name="userName" label="User Name" fullWidth />
              </InputWrapper>
              <InputWrapper>
                <IconWrapper>
                  <EmailOutlined />
                </IconWrapper>
                <TBInput
                  name="email"
                  type="email"
                  label="Email (You Can't change it)"
                  fullWidth
                  disabled
                />
              </InputWrapper>
              <InputWrapper>
                <IconWrapper>
                  <InfoOutlined />
                </IconWrapper>
                <TBInput name="bio" label="Bio" fullWidth />
              </InputWrapper>
              <InputWrapper>
                <IconWrapper>
                  <LockOutlined />
                </IconWrapper>
                <TBInput
                  name="status"
                  label="Status (You Can't change it)"
                  fullWidth
                  disabled
                />
              </InputWrapper>
              <InputWrapper>
                <IconWrapper>
                  <WorkOutlineOutlined />
                </IconWrapper>
                <TBInput
                  name="role"
                  label="Role (You Can't change it)"
                  fullWidth
                  disabled
                />
              </InputWrapper>
              <Box mt={4} display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  fullWidth={isMobile}
                  sx={{
                    borderRadius: '20px',
                    padding: '10px 30px',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                    },
                  }}
                >
                  {isLoading ? 'Updating...' : 'Save Changes'}
                </Button>
              </Box>
            </TBForm>
          </Grid>
        </Grid>
      </StyledPaper>
    </PHFullScreenModal>
  );
};

export default ProfileUpdateModal;
