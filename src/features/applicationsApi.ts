import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQueryWithReauth';
import { IApplication } from '../modules';

export const applicationsApi = createApi({
  reducerPath: 'applicationsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Applications'],
  endpoints: (builder) => ({
    getAllApplications: builder.query<IApplication[], void>({
      query: () => 'api/applications/',
      providesTags: ['Applications'],
    }),

    createApplication: builder.mutation<IApplication, FormData>({
      query: (formData) => ({
        url: 'api/applications/',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Applications'],
    }),

    deleteApplication: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `api/applications/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Applications'],
    }),
  }),
});

export const {
  useGetAllApplicationsQuery,
  useCreateApplicationMutation,
  useDeleteApplicationMutation,
} = applicationsApi;
