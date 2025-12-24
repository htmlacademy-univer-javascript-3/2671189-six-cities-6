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

  it('displays sort options', () => {
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Popular')).toBeInTheDocument();
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
