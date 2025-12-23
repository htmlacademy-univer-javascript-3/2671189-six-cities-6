import { describe, it, expect, vi } from 'vitest';
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
import type { AsyncThunk } from '@reduxjs/toolkit';

type AppAction = { type: string; payload?: unknown };

const api = createAPI();
const mock = new MockAdapter(api);

async function runThunk<Returned, Arg>(
  thunk: AsyncThunk<Returned, Arg, { state: unknown; dispatch: unknown; extra: ReturnType<typeof createAPI> }>,
  arg?: Arg
) {
  const dispatch = vi.fn<(action: AppAction) => void>();
  const getState = vi.fn();
  await thunk(arg as Arg)(dispatch as unknown as (action: AppAction) => void, getState, api);
  return dispatch;
}

function findFulfilled(mockDispatch: ReturnType<typeof vi.fn<(action: AppAction) => void>>) {
  const fulfilledCall = mockDispatch.mock.calls.find(([action]) => {
    const actionType = action && typeof action === 'object' && 'type' in action ? (action as { type: string }).type : '';
    return actionType.endsWith('/fulfilled');
  });
  return fulfilledCall?.[0] as { type: string; payload: unknown } | undefined;
}

describe('async actions', () => {
  it('fetchOffers should dispatch fulfilled with data', async () => {
    const data = [{ id: '1' }];
    mock.onGet('/offers').reply(200, data);
    const dispatch = await runThunk(fetchOffers);
    const fulfilled = findFulfilled(dispatch);
    expect(fulfilled?.payload).toEqual(data);
  });

  it('checkAuth should return email', async () => {
    const data = { email: 'test@example.com' };
    mock.onGet('/login').reply(200, data);
    const dispatch = await runThunk(checkAuth);
    const fulfilled = findFulfilled(dispatch);
    expect(fulfilled?.payload).toEqual('test@example.com');
  });

  it('fetchOfferDetails should work', async () => {
    const data = { id: '1' };
    mock.onGet('/offers/1').reply(200, data);
    const dispatch = await runThunk(fetchOfferDetails, '1');
    const fulfilled = findFulfilled(dispatch);
    expect(fulfilled?.payload).toEqual(data);
  });

  it('fetchNearbyOffers should work', async () => {
    const data = [{ id: '2' }];
    mock.onGet('/offers/1/nearby').reply(200, data);
    const dispatch = await runThunk(fetchNearbyOffers, '1');
    const fulfilled = findFulfilled(dispatch);
    expect(fulfilled?.payload).toEqual(data);
  });

  it('fetchComments should work', async () => {
    const data = [{ id: 'c1' }];
    mock.onGet('/comments/1').reply(200, data);
    const dispatch = await runThunk(fetchComments, '1');
    const fulfilled = findFulfilled(dispatch);
    expect(fulfilled?.payload).toEqual(data);
  });

  it('postComment should work', async () => {
    const data = { id: 'c2' };
    mock.onPost('/comments/1').reply(200, data);
    const dispatch = await runThunk(postComment, { offerId: '1', comment: 'ok', rating: 5 });
    const fulfilled = findFulfilled(dispatch);
    expect(fulfilled?.payload).toEqual(data);
  });

  it('fetchFavorites should work', async () => {
    const data = [{ id: 'f1' }];
    mock.onGet('/favorite').reply(200, data);
    const dispatch = await runThunk(fetchFavorites);
    const fulfilled = findFulfilled(dispatch);
    expect(fulfilled?.payload).toEqual(data);
  });

  it('toggleFavorite should work', async () => {
    const data = { id: '1', isFavorite: true };
    mock.onPost('/favorite/1/1').reply(200, data);
    const dispatch = await runThunk(toggleFavorite, { offerId: '1', status: 1 });
    const fulfilled = findFulfilled(dispatch);
    expect(fulfilled?.payload).toEqual(data);
  });
});
