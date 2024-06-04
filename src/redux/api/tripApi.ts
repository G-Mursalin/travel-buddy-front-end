import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const tripApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get All Trips
    getAllTrips: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/trip",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.trip],
    }),
    // Get Trip By ID
    getTrip: build.query({
      query: (id: string) => {
        return {
          url: `/trip/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.trip],
    }),
    // Create a Trip
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

export const { useCreateTripMutation, useGetAllTripsQuery, useGetTripQuery } =
  tripApi;
