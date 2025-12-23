import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ReviewForm from './review-form';
import { reducer } from '../../store/reducer';

describe('ReviewForm', () => {
  it('renders review form with all elements', () => {
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    expect(screen.getByLabelText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('submit button is disabled initially', () => {
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when rating is selected and review is valid', () => {
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const rating5 = screen.getByDisplayValue('5');
    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(rating5);
    fireEvent.change(textarea, {
      target: { value: 'This is a great place to stay! Very comfortable and clean.' },
    });

    expect(submitButton).not.toBeDisabled();
  });

  it('keeps submit button disabled when review is too short', () => {
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const rating5 = screen.getByDisplayValue('5');
    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(rating5);
    fireEvent.change(textarea, { target: { value: 'Too short' } });

    expect(submitButton).toBeDisabled();
  });

  it('keeps submit button disabled when review is too long', () => {
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const rating5 = screen.getByDisplayValue('5');
    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(rating5);
    fireEvent.change(textarea, { target: { value: 'a'.repeat(301) } });

    expect(submitButton).toBeDisabled();
  });

  it('keeps submit button disabled when no rating is selected', () => {
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(textarea, {
      target: { value: 'This is a great place to stay! Very comfortable and clean.' },
    });

    expect(submitButton).toBeDisabled();
  });

  it('dispatches postComment action on form submit', async () => {
    const mockApi = {
      post: vi.fn().mockResolvedValue({
        data: {
          id: 'c1',
          comment: 'Great place!',
          rating: 5,
          date: new Date().toISOString(),
          user: { name: 'Test', avatarUrl: '', isPro: false },
        },
      }),
    };

    const store = configureStore({
      reducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: { extraArgument: mockApi },
        }),
    });

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const rating5 = screen.getByDisplayValue('5');
    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(rating5);
    fireEvent.change(textarea, {
      target: { value: 'This is a great place to stay! Very comfortable and clean.' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockApi.post).toHaveBeenCalledWith(
        '/comments/1',
        expect.objectContaining({
          comment: 'This is a great place to stay! Very comfortable and clean.',
          rating: 5,
        })
      );
    });
  });
});
