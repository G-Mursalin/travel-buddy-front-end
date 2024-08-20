import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './features/trip/tripSlice';
import { baseApi } from './api/baseApi';

export const store = configureStore({
  reducer: {
    trip: tripReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
