import {configureStore} from '@reduxjs/toolkit';
import {classesApi} from './api/classes';
import {teachersApi} from './api/teachers';

export const store = configureStore({
  reducer: {
    [classesApi.reducerPath]: classesApi.reducer,
    [teachersApi.reducerPath]: teachersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(classesApi.middleware)
      .concat(teachersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
