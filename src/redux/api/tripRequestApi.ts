import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const tripRequestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get All Trips
    getRequestedTrips: build.query({
      query: () => {
        return {
          url: "/trip-request",
          method: "GET",
        };
      },
      providesTags: [tagTypes.tripRequest],
    }),

    // Create a Trip Request
    createTripRequest: build.mutation({
      query: (data) => ({
        url: "/trip-request",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.tripRequest],
    }),

    // ****************
  }),
});

export const { useCreateTripRequestMutation, useGetRequestedTripsQuery } =
  tripRequestApi;
