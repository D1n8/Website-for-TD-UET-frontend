import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { RootState } from '../store';
import { setAuth, logout } from './authSlice';
import { FetchArgs } from '@reduxjs/toolkit/query';

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

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    const refreshResult = await baseQuery(
      {
        url: '/api/token/refresh/',
        method: 'POST',
        body: { refresh: refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken, refreshToken, role } = refreshResult.data as {
        accessToken: string;
        refreshToken: string;
        role: string;
      };

      api.dispatch(setAuth({ accessToken, refreshToken, role }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export default baseQueryWithReauth;


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
