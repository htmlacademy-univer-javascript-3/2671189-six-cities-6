import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import OfferCard from './offer-card';
import { reducer } from '../../store/reducer';
import { requireAuthorization } from '../../store/action';
import { AuthorizationStatus } from '../../const';
import type { Offer } from '../../types/offer';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const createMockOffer = (overrides: Partial<Offer> = {}): Offer => ({
  id: '1',
  title: 'Test Apartment',
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
  ...overrides,
});

describe('OfferCard', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders offer card with correct information', () => {
    const store = configureStore({ reducer });
    const offer = createMockOffer();
    const handleMouseEnter = vi.fn();
    const handleMouseLeave = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard
            offer={offer}
            isActive={false}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Test Apartment')).toBeInTheDocument();
    expect(screen.getByText('€120')).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();
  });

  it('shows premium badge for premium offers', () => {
    const store = configureStore({ reducer });
    const offer = createMockOffer({ isPremium: true });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard
            offer={offer}
            isActive={false}
            onMouseEnter={vi.fn()}
            onMouseLeave={vi.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('calls onMouseEnter with offer id on hover', () => {
    const store = configureStore({ reducer });
    const offer = createMockOffer();
    const handleMouseEnter = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard
            offer={offer}
            isActive={false}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={vi.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    const article = screen.getByRole('article');
    fireEvent.mouseEnter(article);

    expect(handleMouseEnter).toHaveBeenCalledWith('1');
  });

  it('calls onMouseLeave on mouse leave', () => {
    const store = configureStore({ reducer });
    const offer = createMockOffer();
    const handleMouseLeave = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard
            offer={offer}
            isActive={false}
            onMouseEnter={vi.fn()}
            onMouseLeave={handleMouseLeave}
          />
        </MemoryRouter>
      </Provider>
    );

    const article = screen.getByRole('article');
    fireEvent.mouseLeave(article);

    expect(handleMouseLeave).toHaveBeenCalled();
  });

  it('redirects to login when unauthenticated user clicks favorite button', () => {
    const store = configureStore({ reducer });
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    const offer = createMockOffer();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard
            offer={offer}
            isActive={false}
            onMouseEnter={vi.fn()}
            onMouseLeave={vi.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    const bookmarkButton = screen.getByRole('button');
    fireEvent.click(bookmarkButton);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('dispatches toggleFavorite when authenticated user clicks favorite button', async () => {
    const mockApi = {
      get: vi.fn(),
      post: vi.fn().mockResolvedValue({
        data: createMockOffer({ id: '1', isFavorite: true }),
      }),
    };

    const store = configureStore({
      reducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: { extraArgument: mockApi },
        }),
    });

    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    const offer = createMockOffer();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard
            offer={offer}
            isActive={false}
            onMouseEnter={vi.fn()}
            onMouseLeave={vi.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    const bookmarkButton = screen.getByRole('button');
    fireEvent.click(bookmarkButton);

    await vi.waitFor(() => {
      expect(mockApi.post).toHaveBeenCalledWith('/favorite/1/1');
    });
  });

  it('applies active class based on isActive prop', () => {
    const store = configureStore({ reducer });
    const offer = createMockOffer();

    const { rerender } = render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard
            offer={offer}
            isActive={false}
            onMouseEnter={vi.fn()}
            onMouseLeave={vi.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    const article = screen.getByRole('article');
    expect(article).toHaveStyle({ opacity: 0.6 });

    rerender(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard
            offer={offer}
            isActive
            onMouseEnter={vi.fn()}
            onMouseLeave={vi.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(article).toHaveStyle({ opacity: 1 });
  });
});
