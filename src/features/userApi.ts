import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQueryWithReauth';

interface IRegisterAdminRequest {
  email: string;
  username: string;
  password: string;
  last_name: string;
  first_name: string;
  patronymic: string;
  phone: string;
}

interface IAuthRequest {
  email: string;
  password: string;
}

interface ITokenResponse {
  access: string;
  refresh: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    registerAdmin: builder.mutation<void, IRegisterAdminRequest>({
      query: (body) => ({
        url: 'api/register-admin/',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<ITokenResponse, IAuthRequest>({
      query: (body) => ({
        url: 'api/token/',
        method: 'POST',
        body,
      }),
    }),
    refreshToken: builder.mutation<ITokenResponse, { refresh: string }>({
      query: (body) => ({
        url: 'api/token/refresh/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterAdminMutation,
  useLoginMutation,
  useRefreshTokenMutation,
} = userApi;
