import { Offer } from '../mocks/offers';
import { SortType } from '../const';

export const sortOffers = (offers: Offer[], sortType: SortType): Offer[] => {
  const sortedOffers = [...offers];

  switch (sortType) {
    case SortType.PriceLowToHigh:
      return sortedOffers.sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return sortedOffers.sort((a, b) => b.price - a.price);
    case SortType.TopRatedFirst:
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    case SortType.Popular:
    default:
      return sortedOffers;
  }
};
