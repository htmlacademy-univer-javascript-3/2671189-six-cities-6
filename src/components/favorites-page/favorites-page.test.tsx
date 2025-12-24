import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import FavoritesPage from './favorites-page';
import { reducer } from '../../store/reducer';
import { AuthorizationStatus } from '../../const';
import { requireAuthorization } from '../../store/action';

describe('FavoritesPage component', () => {
  it('renders favorites page title', () => {
    const store = configureStore({ reducer });
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });

  it('displays favorites empty state when no favorites', () => {
    const store = configureStore({ reducer });
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });

  it('renders favorites page container', () => {
    const store = configureStore({ reducer });
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(container.querySelector('.page__favorites-container')).toBeInTheDocument();
  });
});
