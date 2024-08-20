import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

// Define a type for the slice state
type TTripState = {
  isDrawerOpen: boolean;
};

// Initial state
const initialState: TTripState = {
  isDrawerOpen: false,
};

export const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setIsDrawerOpen: (state) => {
      state.isDrawerOpen = true;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const { setIsDrawerOpen, toggleDrawer } = tripSlice.actions;

export default tripSlice.reducer;

// Select states
export const selectIsDrawerOpen = (state: RootState) => state.trip.isDrawerOpen;
