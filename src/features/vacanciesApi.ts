import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IVacancy } from '../modules'

export const vacanciesApi = createApi({
    reducerPath: 'vacanciesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        // credentials: 'include',
    }),
    endpoints: (builder) => ({
        getAllVacancies: builder.query<IVacancy[], void>({
            query: () => 'api/vacancies/'
        }),
        getVacancyById: builder.query<IVacancy, number>({
            query: (id) => `api/vacancies/${id}/`,
        }),
    }),
})

export const
    { useGetAllVacanciesQuery,
        useGetVacancyByIdQuery } = vacanciesApi
