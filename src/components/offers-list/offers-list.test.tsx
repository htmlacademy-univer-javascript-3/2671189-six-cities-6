import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import OffersList from './offers-list';
import { reducer } from '../../store/reducer';
import type { Offer } from '../../types/offer';

const createMockOffer = (id: string, title: string): Offer => ({
  id,
  title,
  type: 'apartment',
  price: 120,
  city: {
    name: 'Paris',
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
  },
  location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  previewImage: 'img/apartment-01.jpg',
});

const mockOffers = [
  createMockOffer('1', 'First Apartment'),
  createMockOffer('2', 'Second Apartment'),
  createMockOffer('3', 'Third Apartment'),
];

describe('OffersList', () => {
  it('renders all offers', () => {
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OffersList offers={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('First Apartment')).toBeInTheDocument();
    expect(screen.getByText('Second Apartment')).toBeInTheDocument();
    expect(screen.getByText('Third Apartment')).toBeInTheDocument();
  });

  it('renders empty list when no offers provided', () => {
    const store = configureStore({ reducer });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <OffersList offers={[]} />
        </MemoryRouter>
      </Provider>
    );

    const placesList = container.querySelector('.cities__places-list');
    expect(placesList?.children).toHaveLength(0);
  });

  it('handles mouse enter and leave events on offer cards', () => {
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OffersList offers={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    const firstCard = screen.getByText('First Apartment').closest('article');
    const secondCard = screen.getByText('Second Apartment').closest('article');

    // Initially no card should be highlighted
    expect(firstCard).toHaveStyle({ opacity: 0.6 });

    // Hover over first card
    if (firstCard) {
      fireEvent.mouseEnter(firstCard);
      expect(firstCard).toHaveStyle({ opacity: 1 });
      expect(secondCard).toHaveStyle({ opacity: 0.6 });
    }

    // Leave first card
    if (firstCard) {
      fireEvent.mouseLeave(firstCard);
      expect(firstCard).toHaveStyle({ opacity: 0.6 });
    }

    // Hover over second card
    if (secondCard) {
      fireEvent.mouseEnter(secondCard);
      expect(secondCard).toHaveStyle({ opacity: 1 });
      expect(firstCard).toHaveStyle({ opacity: 0.6 });
    }
  });
});
