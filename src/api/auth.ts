/* eslint-disable @typescript-eslint/ban-types */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface AuthSignup {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: string
}

interface AuthSignin {
  email: string;
  password: string;
}

const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_API,
  }),
  endpoints: (builder) => ({
    signin: builder.mutation<{message: string, accessToken: string, user: {} }, AuthSignin>({
      query: (credentials) => ({
        url: "signin",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<{message: string, user: {} }, AuthSignup>({
      query: (credentials) => ({
        url: "signup",
        method: "POST",
        body: credentials,
      }),
    }),
    // getUser: builder.query<IUser[], void>({
    //   query: () => "users",
    //   providesTags: ["User"],
    // }),
    // getUserById: builder.query<IUser, string | number>({
    //   query: (id) => `users/${id}`,
    //   providesTags: ["User"],
    // }),
    // removeUser: builder.mutation<IUser, string | number>({
    //   query: (id) => ({
    //     url: `users/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["User"],
    // }),
    // editUser: builder.mutation({
    //   query: (user) => ({
    //     url: `users/${user.id}`,
    //     method: "PATCH",
    //     body: user,
    //   }),
    //   invalidatesTags: ["User"],
    // }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  // useGetUserQuery,
  // useGetUserByIdQuery,
  // useEditUserMutation,
  // useRemoveUserMutation,
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;