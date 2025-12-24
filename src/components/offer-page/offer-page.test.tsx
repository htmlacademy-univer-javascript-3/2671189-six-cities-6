import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import OfferPage from './offer-page';
import { reducer } from '../../store/reducer';
import { AuthorizationStatus } from '../../const';
import { requireAuthorization } from '../../store/action';

describe('OfferPage component', () => {
  it('renders offer page', () => {
    const store = configureStore({ reducer });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(container.querySelector('.page')).toBeInTheDocument();
  });

  it('renders with authenticated user', () => {
    const store = configureStore({ reducer });
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(container.querySelector('.page')).toBeInTheDocument();
  });

  it('renders with unauthenticated user', () => {
    const store = configureStore({ reducer });
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(container.querySelector('.page')).toBeInTheDocument();
  });
});
