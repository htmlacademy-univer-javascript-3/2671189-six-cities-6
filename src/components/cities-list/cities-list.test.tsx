import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CitiesList from './cities-list';
import { reducer } from '../../store/reducer';

describe('CitiesList', () => {
  it('renders city list with correct active city', () => {
    const store = configureStore({ reducer });
    render(
      <Provider store={store}>
        <CitiesList currentCity="Paris" />
      </Provider>
    );

    expect(screen.getByText('Paris').closest('a')).toHaveClass('tabs__item--active');
    expect(screen.getByText('Amsterdam').closest('a')).not.toHaveClass('tabs__item--active');
  });

  it('dispatches changeCity action when city link is clicked', () => {
    const store = configureStore({ reducer });
    render(
      <Provider store={store}>
        <CitiesList currentCity="Paris" />
      </Provider>
    );

    const amsterdamLink = screen.getByText('Amsterdam');
    fireEvent.click(amsterdamLink);

    expect(store.getState().city).toBe('Amsterdam');
  });

  it('prevents default link behavior on click', () => {
    const store = configureStore({ reducer });
    render(
      <Provider store={store}>
        <CitiesList currentCity="Paris" />
      </Provider>
    );

    const link = screen.getByText('Cologne').closest('a');
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

    link?.dispatchEvent(clickEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
