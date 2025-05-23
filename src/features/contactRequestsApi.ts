import { createApi } from '@reduxjs/toolkit/query/react';
import { IContactRequests } from '../modules';
import baseQueryWithReauth from './userApi';

export const contactRequestsApi = createApi({
  reducerPath: 'contactRequestsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['ContactRequests'],
  endpoints: (builder) => ({
    getAllContactRequests: builder.query<IContactRequests[], void>({
      query: () => 'api/contact-requests/',
      providesTags: ['ContactRequests'],
    }),
    createContactRequest: builder.mutation<IContactRequests, Partial<IContactRequests>>({
      query: (newRequest) => ({
        url: 'api/contact-requests/',
        method: 'POST',
        body: newRequest,
        headers: {
          skipAuth: 'true'
        },
      }),
      invalidatesTags: ['ContactRequests'],
    }),
    deleteContactRequest: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `api/contact-requests/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ContactRequests'],
    }),
  }),
});

export const {
  useGetAllContactRequestsQuery,
  useCreateContactRequestMutation,
  useDeleteContactRequestMutation,
} = contactRequestsApi;
