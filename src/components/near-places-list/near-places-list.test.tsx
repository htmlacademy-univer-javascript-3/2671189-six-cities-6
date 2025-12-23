import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import NearPlacesList from './near-places-list';
import { reducer } from '../../store/reducer';
import type { Offer } from '../../types/offer';

const makeOffer = (overrides: Partial<Offer> = {}): Offer => ({
  id: 'test-1',
  title: 'Test Offer',
  type: 'apartment',
  price: 100,
  previewImage: 'img/test.jpg',
  isPremium: false,
  isFavorite: false,
  rating: 4,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 12,
    },
  },
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 12,
  },
  ...overrides,
});

describe('NearPlacesList component', () => {
  it('renders nearby offers list', () => {
    const store = configureStore({ reducer });
    const offers = [
      makeOffer({ id: '1', title: 'Nearby Offer 1' }),
      makeOffer({ id: '2', title: 'Nearby Offer 2' }),
    ];

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NearPlacesList offers={offers} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Nearby Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Nearby Offer 2')).toBeInTheDocument();
  });

  it('renders correct number of offer cards', () => {
    const store = configureStore({ reducer });
    const offers = [
      makeOffer({ id: '1' }),
      makeOffer({ id: '2' }),
      makeOffer({ id: '3' }),
    ];

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NearPlacesList offers={offers} />
        </MemoryRouter>
      </Provider>
    );

    const cards = container.querySelectorAll('.near-places__card');
    expect(cards).toHaveLength(3);
  });

  it('renders empty list when no offers provided', () => {
    const store = configureStore({ reducer });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NearPlacesList offers={[]} />
        </MemoryRouter>
      </Provider>
    );

    const cards = container.querySelectorAll('.near-places__card');
    expect(cards).toHaveLength(0);
  });
});
