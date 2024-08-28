'use client';

import { useGetMyProfileQuery } from '@/redux/api/userApi';
import { logoutUser } from '@/services/actions/logOutUser';
import { TUser } from '@/types';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/navigation';

import { MouseEvent, useState } from 'react';

const settings = ['My Profile', 'Logout'];

type AccountMenuProps = {
  setIsUserLoggedIn: (isLoggedIn: boolean) => void;
};

export default function AccountMenu({ setIsUserLoggedIn }: AccountMenuProps) {
  const { data, isFetching, isLoading } = useGetMyProfileQuery(undefined);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleLogout = () => {
    logoutUser(router);
    setIsUserLoggedIn(false);
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { data: user }: { data: TUser } = data;

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user?.userName} src={user?.profileImage} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography
              onClick={() => {
                if (setting === settings[1]) {
                  handleLogout();
                }
                if (setting === settings[0]) {
                  router.push('/dashboard/my-profile');
                }
              }}
              textAlign="center"
            >
              {setting}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
