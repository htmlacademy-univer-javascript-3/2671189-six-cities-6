import { describe, it, expect } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../api';
import {
  fetchOffers,
  fetchOfferDetails,
  fetchNearbyOffers,
  fetchComments,
  postComment,
  fetchFavorites,
  toggleFavorite,
  checkAuth,
} from './action';

const api = createAPI();
const mock = new MockAdapter(api);

const runThunk = async (thunk: any, arg: any = undefined) => {
  const dispatch = vi.fn();
  const getState = vi.fn();
  await thunk(arg)(dispatch, getState, api);
  return dispatch;
};

describe('async actions', () => {
  it('fetchOffers should dispatch fulfilled with data', async () => {
    const data = [{ id: '1' }];
    mock.onGet('/offers').reply(200, data);
    const dispatch = await runThunk(fetchOffers);
    const fulfilled = dispatch.mock.calls.find(([action]: any) => action.type.endsWith('/fulfilled'))[0];
    expect(fulfilled.payload).toEqual(data);
  });

  it('checkAuth should return email', async () => {
    const data = { email: 'test@example.com' };
    mock.onGet('/login').reply(200, data);
    const dispatch = await runThunk(checkAuth);
    const fulfilled = dispatch.mock.calls.find(([action]: any) => action.type.endsWith('/fulfilled'))[0];
    expect(fulfilled.payload).toEqual('test@example.com');
  });

  it('fetchOfferDetails should work', async () => {
    const data = { id: '1' };
    mock.onGet('/offers/1').reply(200, data);
    const dispatch = await runThunk(fetchOfferDetails, '1');
    const fulfilled = dispatch.mock.calls.find(([action]: any) => action.type.endsWith('/fulfilled'))[0];
    expect(fulfilled.payload).toEqual(data);
  });

  it('fetchNearbyOffers should work', async () => {
    const data = [{ id: '2' }];
    mock.onGet('/offers/1/nearby').reply(200, data);
    const dispatch = await runThunk(fetchNearbyOffers, '1');
    const fulfilled = dispatch.mock.calls.find(([action]: any) => action.type.endsWith('/fulfilled'))[0];
    expect(fulfilled.payload).toEqual(data);
  });

  it('fetchComments should work', async () => {
    const data = [{ id: 'c1' }];
    mock.onGet('/comments/1').reply(200, data);
    const dispatch = await runThunk(fetchComments, '1');
    const fulfilled = dispatch.mock.calls.find(([action]: any) => action.type.endsWith('/fulfilled'))[0];
    expect(fulfilled.payload).toEqual(data);
  });

  it('postComment should work', async () => {
    const data = { id: 'c2' };
    mock.onPost('/comments/1').reply(200, data);
    const dispatch = await runThunk(postComment, { offerId: '1', comment: 'ok', rating: 5 });
    const fulfilled = dispatch.mock.calls.find(([action]: any) => action.type.endsWith('/fulfilled'))[0];
    expect(fulfilled.payload).toEqual(data);
  });

  it('fetchFavorites should work', async () => {
    const data = [{ id: 'f1' }];
    mock.onGet('/favorite').reply(200, data);
    const dispatch = await runThunk(fetchFavorites);
    const fulfilled = dispatch.mock.calls.find(([action]: any) => action.type.endsWith('/fulfilled'))[0];
    expect(fulfilled.payload).toEqual(data);
  });

  it('toggleFavorite should work', async () => {
    const data = { id: '1', isFavorite: true };
    mock.onPost('/favorite/1/1').reply(200, data);
    const dispatch = await runThunk(toggleFavorite, { offerId: '1', status: 1 });
    const fulfilled = dispatch.mock.calls.find(([action]: any) => action.type.endsWith('/fulfilled'))[0];
    expect(fulfilled.payload).toEqual(data);
  });
});
