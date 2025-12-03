import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortType, fetchOffers, checkAuth, login, logout, requireAuthorization, fetchOfferDetails, fetchNearbyOffers, fetchComments, postComment } from './action';
import { Offer, OfferDetailed, Review } from '../types/offer';
import { AuthorizationStatus, SortType } from '../const';

export type State = {
  city: string;
  offers: Offer[];
  sortType: SortType;
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
  offerDetails: OfferDetailed | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isOfferLoading: boolean;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  sortType: SortType.Popular,
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
  offerDetails: null,
  nearbyOffers: [],
  comments: [],
  isOfferLoading: false,
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
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(checkAuth.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userEmail = action.payload;
    })
    .addCase(checkAuth.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userEmail = action.payload;
    })
    .addCase(login.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userEmail = null;
    })
    .addCase(fetchOfferDetails.pending, (state) => {
      state.isOfferLoading = true;
    })
    .addCase(fetchOfferDetails.fulfilled, (state, action) => {
      state.offerDetails = action.payload;
      state.isOfferLoading = false;
    })
    .addCase(fetchOfferDetails.rejected, (state) => {
      state.isOfferLoading = false;
      state.offerDetails = null;
    })
    .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(postComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
});
