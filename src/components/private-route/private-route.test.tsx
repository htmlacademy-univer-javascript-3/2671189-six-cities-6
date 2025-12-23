import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PrivateRoute from './private-route';
import { AuthorizationStatus } from '../../const';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { reducer } from '../../store/reducer';
import { requireAuthorization } from '../../store/action';

describe('PrivateRoute', () => {
  it('renders children when authorized', () => {
    const store = configureStore({ reducer });
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/priv']}>
          <Routes>
            <Route path="/priv" element={<PrivateRoute><div>Secret</div></PrivateRoute>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Secret')).toBeInTheDocument();
  });

  it('redirects to login when not authorized', () => {
    const store = configureStore({ reducer });
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/priv']}>
          <Routes>
            <Route path="/priv" element={<PrivateRoute><div>Secret</div></PrivateRoute>} />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
