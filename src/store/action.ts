import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { AuthorizationStatus, SortType } from '../const';

export const changeCity = createAction<string>('city/change');
export const changeSortType = createAction<SortType>('sort/change');
export const setOffersLoading = createAction<boolean>('offers/setLoading');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const fetchOffers = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
  'offers/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/offers');
    return data;
  }
);

export const checkAuth = createAsyncThunk<string, undefined, { extra: AxiosInstance }>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get('/login');
    return data.email;
  }
);

export const login = createAsyncThunk<string, { email: string; password: string }, { extra: AxiosInstance }>(
  'user/login',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post('/login', { email, password });
    const token = data.token;
    localStorage.setItem('six-cities-token', token);
    return data.email;
  }
);

export const logout = createAction('user/logout', () => {
  localStorage.removeItem('six-cities-token');
  return { payload: undefined };
});
