import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4444' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = authApi;
