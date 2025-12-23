import { describe, it, expect } from 'vitest';
import { reducer, State } from './reducer';
import { AuthorizationStatus, SortType } from '../const';
import {
  changeCity,
  changeSortType,
  fetchOffers,
  requireAuthorization,
  checkAuth,
  login,
  logout,
  fetchOfferDetails,
  fetchNearbyOffers,
  fetchComments,
  postComment,
  fetchFavorites,
  toggleFavorite,
} from './action';

const makeOffer = (overrides: Partial<any> = {}) => ({
  id: 'id-1',
  title: 'Test offer',
  type: 'apartment',
  price: 100,
  previewImage: 'img/test.jpg',
  isPremium: false,
  isFavorite: false,
  rating: 4,
  city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
  location: { latitude: 0, longitude: 0, zoom: 10 },
  ...overrides,
});

const initial: State = {
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
  favoriteOffers: [],
};

describe('reducer', () => {
  it('should return initial state by default', () => {
    expect(reducer(undefined, { type: 'UNKNOWN' })).toEqual(initial);
  });

  it('should handle changeCity', () => {
    const state = reducer(initial, changeCity('Amsterdam'));
    expect(state.city).toBe('Amsterdam');
  });

  it('should handle changeSortType', () => {
    const state = reducer(initial, changeSortType(SortType.PriceLowToHigh));
    expect(state.sortType).toBe(SortType.PriceLowToHigh);
  });

  it('should set offers loading on fetchOffers.pending', () => {
    const state = reducer(initial, fetchOffers.pending('req')); 
    expect(state.isOffersLoading).toBe(true);
  });

  it('should fill offers on fetchOffers.fulfilled', () => {
    const offers = [makeOffer({ id: 'a' })];
    const state = reducer(initial, fetchOffers.fulfilled(offers, 'req'));
    expect(state.offers).toEqual(offers);
    expect(state.isOffersLoading).toBe(false);
  });

  it('should reset loading on fetchOffers.rejected', () => {
    const state = reducer({ ...initial, isOffersLoading: true }, fetchOffers.rejected(new Error('e'), 'req'));
    expect(state.isOffersLoading).toBe(false);
  });

  it('should set auth status on requireAuthorization', () => {
    const state = reducer(initial, requireAuthorization(AuthorizationStatus.Auth));
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should set user on checkAuth.fulfilled', () => {
    const state = reducer(initial, checkAuth.fulfilled('test@example.com', 'req'));
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.userEmail).toBe('test@example.com');
  });

  it('should set no auth on checkAuth.rejected', () => {
    const state = reducer(initial, checkAuth.rejected(new Error('e'), 'req'));
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should set user on login.fulfilled', () => {
    const state = reducer(initial, login.fulfilled('user@example.com', 'req', { email: '', password: '' }));
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.userEmail).toBe('user@example.com');
  });

  it('should set no auth on login.rejected', () => {
    const state = reducer(initial, login.rejected(new Error('e'), 'req', { email: '', password: '' }));
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should clear user on logout', () => {
    const state = reducer({ ...initial, userEmail: 'u', authorizationStatus: AuthorizationStatus.Auth }, logout());
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(state.userEmail).toBeNull();
  });

  it('should handle offer details loading', () => {
    let state = reducer(initial, fetchOfferDetails.pending('req', 'id-1'));
    expect(state.isOfferLoading).toBe(true);
    const details = { ...makeOffer(), description: 'desc', bedrooms: 2, goods: [], host: { name: 'host', isPro: false, avatarUrl: '' } } as any;
    state = reducer(state, fetchOfferDetails.fulfilled(details, 'req', 'id-1'));
    expect(state.offerDetails).toEqual(details);
    expect(state.isOfferLoading).toBe(false);
    state = reducer(state, fetchOfferDetails.rejected(new Error('e'), 'req', 'id-1'));
    expect(state.isOfferLoading).toBe(false);
    expect(state.offerDetails).toBeNull();
  });

  it('should set nearby offers', () => {
    const nearby = [makeOffer({ id: 'n1' })];
    const state = reducer(initial, fetchNearbyOffers.fulfilled(nearby, 'req', 'id-1'));
    expect(state.nearbyOffers).toEqual(nearby);
  });

  it('should set comments and append on post', () => {
    const comments = [{ id: 'c1', date: new Date().toISOString(), comment: 'ok', rating: 4, user: { name: 'u', avatarUrl: '', isPro: false } }];
    let state = reducer(initial, fetchComments.fulfilled(comments as any, 'req', 'id-1'));
    expect(state.comments).toEqual(comments);
    const newComment = { id: 'c2', date: new Date().toISOString(), comment: 'new', rating: 5, user: { name: 'u2', avatarUrl: '', isPro: true } } as any;
    state = reducer(state, postComment.fulfilled(newComment, 'req', { offerId: 'id-1', comment: 'new', rating: 5 }));
    expect(state.comments).toHaveLength(2);
  });

  it('should set favorite offers on fetchFavorites.fulfilled', () => {
    const favs = [makeOffer({ id: 'f1', isFavorite: true })];
    const state = reducer(initial, fetchFavorites.fulfilled(favs, 'req'));
    expect(state.favoriteOffers).toEqual(favs);
  });

  it('should update state on toggleFavorite.fulfilled', () => {
    const offer = makeOffer({ id: 'o1', isFavorite: false });
    const start = { ...initial, offers: [offer], nearbyOffers: [offer], offerDetails: { ...offer } as any };
    const updated = { ...offer, isFavorite: true };
    const state = reducer(start, toggleFavorite.fulfilled(updated, 'req', { offerId: 'o1', status: 1 }));
    expect(state.offers[0].isFavorite).toBe(true);
    expect(state.nearbyOffers[0].isFavorite).toBe(true);
    expect(state.offerDetails?.isFavorite).toBe(true);
    expect(state.favoriteOffers.find((o) => o.id === 'o1')).toBeDefined();
  });
});
