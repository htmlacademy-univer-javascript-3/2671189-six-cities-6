import { createSelector } from '@reduxjs/toolkit';
import { State } from './reducer';
import { sortOffers } from '../utils/sort';
import { AuthorizationStatus } from '../const';

export const selectCity = (state: State) => state.city;
export const selectOffers = (state: State) => state.offers;
export const selectSortType = (state: State) => state.sortType;
export const selectAuthorizationStatus = (state: State) => state.authorizationStatus;

export const selectFilteredOffers = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);

export const selectSortedOffers = createSelector(
  [selectFilteredOffers, selectSortType],
  (filteredOffers, sortType) => sortOffers(filteredOffers, sortType)
);

export const selectCityLocation = createSelector(
  [selectSortedOffers],
  (sortedOffers) => sortedOffers[0]?.city.location
);

export const selectIsAuthenticated = createSelector(
  [selectAuthorizationStatus],
  (status) => status === AuthorizationStatus.Auth
);
