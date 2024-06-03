import { authKey } from "@/constants/authKey";
import { deleteCookies } from "@/services/actions/deleteCookies";
import { getFromLocalStorage } from "@/utils/localStorage";
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";

// Set Token to header
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  // baseUrl: " https://travel-buddy-back-end.vercel.app/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = getFromLocalStorage(authKey);
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

// Base query with logout if user unauthorized
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Logout User
    localStorage.removeItem(authKey);
    deleteCookies([authKey, "accessToken"]);

    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

// Base Api
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: tagTypesList,
  endpoints: (builder) => ({}),
});
