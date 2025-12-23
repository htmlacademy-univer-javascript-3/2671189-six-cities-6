import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Review from './review';
import type { Review as ReviewType } from '../../types/offer';

describe('Review', () => {
  it('renders single review', () => {
    const review: ReviewType = {
      id: 'r1',
      date: new Date().toISOString(),
      comment: 'Nice place',
      rating: 5,
      user: { name: 'Alice', avatarUrl: '', isPro: true },
    };
    render(<Review review={review} />);
    expect(screen.getByText('Nice place')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });
});
