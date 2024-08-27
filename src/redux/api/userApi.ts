import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

export const profileAPi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get My Profile
    getMyProfile: build.query({
      query: () => {
        return {
          url: '/user/get-me',
          method: 'GET',
        };
      },
      providesTags: [tagTypes.user],
    }),

    // Update My Profile
    updateMyProfile: build.mutation({
      query: ({ data }) => {
        return {
          url: `/user/update-me`,
          method: 'PATCH',
          body: { ...data },
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    // **********
  }),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = profileAPi;
