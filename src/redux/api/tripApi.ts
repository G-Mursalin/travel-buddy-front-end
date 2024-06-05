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
    // Get Login user Trips
    getLoginUserTrips: build.query({
      query: () => {
        return {
          url: "/trip/my-posts",
          method: "GET",
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
    // Delete A  Trip
    deleteTrip: build.mutation({
      query: (id) => ({
        url: `/trip/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.trip, tagTypes.tripRequest],
    }),
    // Delete A Doctor
    updateTrip: build.mutation({
      query: ({ id, data }) => ({
        url: `/trip/${id}`,
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: [tagTypes.trip, tagTypes.tripRequest],
    }),

    // ****************
  }),
});

export const {
  useCreateTripMutation,
  useGetAllTripsQuery,
  useGetTripQuery,
  useGetLoginUserTripsQuery,
  useDeleteTripMutation,
  useUpdateTripMutation,
} = tripApi;
