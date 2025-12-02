import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../mocks/offers';
import { SortType } from '../const';

export const changeCity = createAction<string>('city/change');
export const fillOffers = createAction<Offer[]>('offers/fill');
export const changeSortType = createAction<SortType>('sort/change');
