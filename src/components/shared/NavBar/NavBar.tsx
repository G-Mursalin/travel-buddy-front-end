'use client';

import AccountMenu from '@/components/Shared/AccountMenu/AccountMenu';
import { getUserInfo, isLoggedIn } from '@/services/auth.services';
import { TJwtPayload } from '@/types';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { MouseEvent, useEffect, useState } from 'react';

const pages = [
  {
    id: '1',
    path: '/',
    label: 'Home',
  },
  {
    id: '2',
    path: '/about-us',
    label: 'About Us',
  },
  {
    id: '3',
    path: '/all-trips',
    label: 'All Trips',
  },
];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState('');

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    if (isLoggedIn()) {
      const user = getUserInfo() as TJwtPayload;
      setUserRole(user.role);
      setIsUserLoggedIn(true);
    }
  }, []);

  const dashboardPath =
    userRole === 'admin' ? '/dashboard/admin' : '/dashboard';

  return (
    <Container>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Big Screen Logo */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Travel Buddy
            </Typography>

            {/* Small Screen Nav Links */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map(({ id, path, label }) => (
                  <MenuItem key={id} onClick={handleCloseNavMenu}>
                    <Typography component={Link} href={path}>
                      {label}
                    </Typography>
                  </MenuItem>
                ))}
                {isUserLoggedIn && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography component={Link} href={dashboardPath}>
                      Dashboard
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>

            {/* Small Screen Logo */}
            <Link href="/login">
              <Typography
                variant="h5"
                noWrap
                component="p"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontSize: '1rem',
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Travel Buddy
              </Typography>
            </Link>

            {/* Big Screen Nav Links */}
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: 'none',
                  md: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              }}
            >
              <Stack direction="row" justifyContent="space-between" gap={4}>
                {pages.map(({ id, path, label }) => (
                  <Typography
                    sx={{ color: 'white', fontWeight: 'bold' }}
                    key={id}
                    component={Link}
                    href={path}
                  >
                    {label}
                  </Typography>
                ))}
                {isUserLoggedIn && (
                  <Typography
                    sx={{ color: 'white', fontWeight: 'bold' }}
                    component={Link}
                    href={dashboardPath}
                  >
                    Dashboard
                  </Typography>
                )}
              </Stack>
            </Box>

            {/* Account Settings */}
            {isUserLoggedIn ? (
              <AccountMenu setIsUserLoggedIn={setIsUserLoggedIn} />
            ) : (
              <Button
                component={Link}
                href={'/login'}
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  fontSize: '16px',
                  padding: '10px 20px',
                }}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Container>
  );
};

export default NavBar;
