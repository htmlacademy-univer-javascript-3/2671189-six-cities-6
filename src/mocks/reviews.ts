export type Review = {
  id: string;
  offerId: string;
  userName: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  date: string;
};

export const mockReviews: Review[] = [
  {
    id: 'r1',
    offerId: '1',
    userName: 'Max',
    avatarUrl: 'img/avatar-max.jpg',
    rating: 4,
    comment: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24'
  },
  {
    id: 'r2',
    offerId: '1',
    userName: 'Anna',
    avatarUrl: 'img/avatar-angelina.jpg',
    rating: 5,
    comment: 'Beautiful apartment with amazing view. The host was very welcoming and helpful.',
    date: '2020-10-12'
  },
  {
    id: 'r3',
    offerId: '2',
    userName: 'John',
    avatarUrl: 'img/avatar-max.jpg',
    rating: 4,
    comment: 'Nice place, good location. Would recommend.',
    date: '2021-05-15'
  }
];
