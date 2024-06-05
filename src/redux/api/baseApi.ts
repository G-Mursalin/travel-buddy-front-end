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
  baseUrl: process.env.NEXT_PUBLIC_DEV_BACKEND_URL,
  // baseUrl: process.env.NEXT_PUBLIC_PROD_BACKEND_URL,
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
