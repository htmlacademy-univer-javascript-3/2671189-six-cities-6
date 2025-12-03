import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortType, fetchOffers } from './action';
import { Offer } from '../types/offer';
import { SortType } from '../const';

export type State = {
  city: string;
  offers: Offer[];
  sortType: SortType;
  isOffersLoading: boolean;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  sortType: SortType.Popular,
  isOffersLoading: false,
};

export const reducer = createReducer<State>(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.isOffersLoading = false;
    });
});
