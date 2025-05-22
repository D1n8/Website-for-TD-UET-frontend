import { createApi } from '@reduxjs/toolkit/query/react';
import { IVacancy } from '../modules';
import baseQueryWithReauth from './userApi'; // путь должен быть до baseQueryWithReauth, а не весь userApi!

export const vacanciesApi = createApi({
  reducerPath: 'vacanciesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Vacancy'],
  endpoints: (builder) => ({
    getAllVacancies: builder.query<
      IVacancy[],
      {
        min_salary?: number;
        title?: string;
        format_type?: string;
        location?: string;
        experience_type: string;
      }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.min_salary) searchParams.append('min_salary', params.min_salary.toString());
        if (params?.title) searchParams.append('title', params.title);
        if (params?.format_type) searchParams.append('format_type', params.format_type);
        if (params?.location) searchParams.append('location', params.location);
        if (params?.experience_type) searchParams.append('experience_type', params.experience_type);

        return `api/vacancies/?${searchParams.toString()}`;
      },
      providesTags: ['Vacancy'],
    }),

    getVacancyById: builder.query<IVacancy, number>({
      query: (id) => `api/vacancies/${id}/`,
    }),

    createVacancy: builder.mutation<IVacancy, Partial<IVacancy>>({
      query: (newVacancy) => ({
        url: 'api/vacancies/',
        method: 'POST',
        body: newVacancy,
      }),
      invalidatesTags: ['Vacancy'],
    }),

    updateVacancy: builder.mutation<IVacancy, { id: number; data: Partial<IVacancy> }>({
      query: ({ id, data }) => ({
        url: `api/vacancies/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Vacancy'],
    }),

    deleteVacancy: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `api/vacancies/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Vacancy'],
    }),
  }),
});

export const {
  useGetAllVacanciesQuery,
  useGetVacancyByIdQuery,
  useCreateVacancyMutation,
  useUpdateVacancyMutation,
  useDeleteVacancyMutation,
} = vacanciesApi;
