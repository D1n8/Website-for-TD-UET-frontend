import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQueryWithReauth';
import { INews } from '../modules';

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['News'],
    endpoints: (builder) => ({
        getAllNews: builder.query<INews[], void>({
            query: () => 'api/news/',
            providesTags: ['News'],
        }),

        getNewsById: builder.query<INews, number>({
            query: (id) => `api/news/${id}/`,
        }),

        createNews: builder.mutation<INews, FormData>({
            query: (formData) => ({
                url: 'api/news/',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['News'],
        }),


        updateNews: builder.mutation<INews, { id: number; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `api/news/${id}/`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['News'],
        }),

        deleteNews: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `api/news/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['News'],
        }),

    }),
});

export const {
    useGetAllNewsQuery,
    useGetNewsByIdQuery,
    useCreateNewsMutation,
    useUpdateNewsMutation,
    useDeleteNewsMutation,
} = newsApi;
