import RegisterForm from '@/components/UI/RegisterForm/RegisterForm';
import { Box, Container, Stack, Typography } from '@mui/material';

const RegisterPage = () => {
  return (
    <Container>
      <Stack
        sx={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: '100%',
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={600}>
                User Register
              </Typography>
            </Box>
          </Stack>

          {/* Form */}
          <Box>
            <RegisterForm />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
