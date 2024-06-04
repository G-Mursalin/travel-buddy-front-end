import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const tripRequestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
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

export const { useCreateTripRequestMutation } = tripRequestApi;
