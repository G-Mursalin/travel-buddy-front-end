import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const profileAPi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get All Users
    getAllUsers: build.query({
      query: () => {
        return {
          url: "/user",
          method: "GET",
        };
      },
      providesTags: [tagTypes.users],
    }),

    // Change User Role
    changeUserRole: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/user/change-role/${id}`,
          method: "POST",
          body: { ...data },
        };
      },
      invalidatesTags: [tagTypes.users],
    }),

    // Change User Status
    changeUserStatus: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/user/change-status/${id}`,
          method: "POST",
          body: { ...data },
        };
      },
      invalidatesTags: [tagTypes.users],
    }),

    // **********
  }),
});

export const {
  useGetAllUsersQuery,
  useChangeUserRoleMutation,
  useChangeUserStatusMutation,
} = profileAPi;
