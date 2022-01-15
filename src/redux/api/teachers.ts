import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Teacher} from '../../typings';

export const teachersApi = createApi({
  reducerPath: 'teachersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://table/api',
  }),
  endpoints: (builder) => ({
    teachers: builder.query<Teacher[], Record<string, never>>({
      query: () => `/teachers`,
    }),
  }),
});

export const {reducerPath, useTeachersQuery} = teachersApi;
