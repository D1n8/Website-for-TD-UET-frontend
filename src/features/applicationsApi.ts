import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './userApi';
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

    createApplication: builder.mutation<IApplication, Omit<IApplication, 'id'>>({
      query: (newApplication) => {
        const formData = new FormData();
        formData.append('name', newApplication.name);
        formData.append('surname', newApplication.surname);
        formData.append('patronymic', newApplication.patronymic);
        formData.append('email', newApplication.email);
        formData.append('phone', newApplication.phone);
        formData.append('resume_text', newApplication.resume_text);
        formData.append('vacancy', newApplication.vacancy.toString());

        if (newApplication.resume_file) {
          formData.append('resume_file', newApplication.resume_file);
        }

        return {
          url: 'api/applications/',
          method: 'POST',
          body: formData,
          headers: {
            skipAuth: 'true',
          },
        };
      },
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
