import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer, OfferDetailed, Review } from '../types/offer';
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

export const fetchOfferDetails = createAsyncThunk<OfferDetailed, string, { extra: AxiosInstance }>(
  'offer/fetchDetails',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferDetailed>(`/offers/${offerId}`);
    return data;
  }
);

export const fetchNearbyOffers = createAsyncThunk<Offer[], string, { extra: AxiosInstance }>(
  'offer/fetchNearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
    return data;
  }
);

export const fetchComments = createAsyncThunk<Review[], string, { extra: AxiosInstance }>(
  'comments/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`/comments/${offerId}`);
    return data;
  }
);

export const postComment = createAsyncThunk<
  Review,
  { offerId: string; comment: string; rating: number },
  { extra: AxiosInstance }
>(
  'comments/post',
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<Review>(`/comments/${offerId}`, { comment, rating });
    return data;
  }
);
