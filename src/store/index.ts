import { configureStore } from '@reduxjs/toolkit';
import { reducer, State } from './reducer';
import { createAPI } from '../api';

const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = State;
export type AppDispatch = typeof store.dispatch;
