import getBaseUrl from "../../../utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../../firebase/firebase.config";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/user`,
  credentials: "include",
  prepareHeaders: async (headers) => {
    const user = auth.currentUser;
    const token = await user.getIdToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = userApi;
export default userApi;
