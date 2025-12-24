import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './main-page';
import { reducer } from '../../store/reducer';
import { AuthorizationStatus } from '../../const';
import { requireAuthorization } from '../../store/action';

describe('MainPage component', () => {
  it('renders cities list', () => {
    const store = configureStore({ reducer });
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
  });

  it('displays places to stay when offers available', () => {
    const store = configureStore({ reducer });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    const placesContainer = container.querySelector('.cities__places-container');
    expect(placesContainer).toBeInTheDocument();
  });

  it('renders main page container', () => {
    const store = configureStore({ reducer });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(container.querySelector('.page--gray')).toBeInTheDocument();
  });
});
