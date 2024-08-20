'use client';

import { setIsDrawerOpen } from '@/redux/features/trip/tripSlice';
import { useAppDispatch } from '@/redux/hooks';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton } from '@mui/material';

const DrawerOpenButton = () => {
  const dispatch = useAppDispatch();

  return (
    <IconButton>
      <FilterListIcon
        onClick={() => {
          dispatch(setIsDrawerOpen());
        }}
      />
    </IconButton>
  );
};

export default DrawerOpenButton;
