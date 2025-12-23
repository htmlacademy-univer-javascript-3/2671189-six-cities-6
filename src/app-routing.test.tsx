import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/main-page/main-page';
import LoginPage from './components/login-page/login-page';
import FavoritesPage from './components/favorites-page/favorites-page';
import OfferPage from './components/offer-page/offer-page';
import NotFoundPage from './components/not-found-page/not-found-page';
import PrivateRoute from './components/private-route/private-route';
import { AuthorizationStatus } from './const';
import { reducer } from './store/reducer';
import { requireAuthorization } from './store/action';
const store = configureStore({ reducer });
store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));

describe('App routing', () => {
  it('renders not found on unknown route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown']}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
            <Route path="/offer/:id" element={<OfferPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('redirects favorites to login when unauthorized', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/favorites']}>
          <Routes>
            <Route path="/favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
