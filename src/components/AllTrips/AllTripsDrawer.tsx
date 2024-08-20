'use client';

import {
  selectIsDrawerOpen,
  toggleDrawer,
} from '@/redux/features/trip/tripSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Drawer } from '@mui/material';
import AllTripsSidebar from './AllTripsSidebar';

const AllTripsDrawer = () => {
  const isDrawerOpen = useAppSelector(selectIsDrawerOpen);
  const dispatch = useAppDispatch();

  const handleToggleDrawer = () => (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    dispatch(toggleDrawer());
  };

  return (
    <Drawer anchor="left" open={isDrawerOpen} onClose={handleToggleDrawer()}>
      <AllTripsSidebar />
    </Drawer>
  );
};

export default AllTripsDrawer;
