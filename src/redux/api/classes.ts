import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Class, Group} from '../../typings';

export const classesApi = createApi({
  reducerPath: 'classesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://table/api',
  }),
  endpoints: (builder) => ({
    classesByGroup: builder.query<Class[], string>({
      query: (groupId) => `/classes/group/${groupId}`,
    }),
    classesByGroupAndDate: builder.query<
      Class[],
      {date: string; groupId: string}
    >({
      query: ({groupId, date}) =>
        `/classes/group/${groupId}/getByDate?date=${date}`,
    }),
    classesByTeacherAndDate: builder.query<
      Class[],
      {date: string; teacherId: string}
    >({
      query: ({teacherId, date}) =>
        `/classes/teacher/${teacherId}?date=${date}`,
    }),
    group: builder.query<Group[], Record<string, never>>({
      query: () => `/groups`,
    }),
  }),
});

export const {
  reducerPath,
  useClassesByGroupQuery,
  useClassesByGroupAndDateQuery,
  useClassesByTeacherAndDateQuery,
  useGroupQuery,
} = classesApi;
