import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffers, changeSortType } from './action';
import { Offer } from '../mocks/offers';
import { SortType } from '../const';

type State = {
  city: string;
  offers: Offer[];
  sortType: SortType;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  sortType: SortType.Popular,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    });
});
