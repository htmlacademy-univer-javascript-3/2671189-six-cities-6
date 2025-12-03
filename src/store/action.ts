import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { SortType } from '../const';

export const changeCity = createAction<string>('city/change');
export const changeSortType = createAction<SortType>('sort/change');
export const setOffersLoading = createAction<boolean>('offers/setLoading');

export const fetchOffers = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
  'offers/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/offers');
    return data;
  }
);
