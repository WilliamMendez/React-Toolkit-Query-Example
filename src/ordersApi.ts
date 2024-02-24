import { EndpointBuilder, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8000';
// const BASE_URL = 'https://api.example.com';

interface Order {
    id: string;
    status: string;
    amount: number;
    currency: string;
}

export const api = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Orders'],
    endpoints: (builder: EndpointBuilder<any, any, any>) => ({
        getOrderById: builder.query({
            query: (id: string) => ({ url: `/orders/${id}` }),
            transformResponse: (response: { order: Order }) => response.order,
            transformErrorResponse: (response) => response,
            providesTags: ['Orders'],
        }),
        cancelOrderById: builder.mutation({
            query: (id: string) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetOrderByIdQuery, useCancelOrderByIdMutation } = api;
