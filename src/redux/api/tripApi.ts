import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const tripApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get All Trips
    getAllTrips: build.query({
      query: () => {
        return {
          url: "/trip",
          method: "GET",
        };
      },
      providesTags: [tagTypes.trip],
    }),
    // Register User
    createTrip: build.mutation({
      query: (data) => ({
        url: "/trip",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.trip],
    }),

    // ****************
  }),
});

export const { useCreateTripMutation, useGetAllTripsQuery } = tripApi;
