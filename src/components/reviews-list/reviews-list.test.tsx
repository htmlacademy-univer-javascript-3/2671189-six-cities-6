import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';

const reviews = Array.from({ length: 3 }, (_, i) => ({
  id: `r${i}`,
  date: new Date().toISOString(),
  comment: `Comment ${i}`,
  rating: 4,
  user: { name: `User ${i}`, avatarUrl: '', isPro: false },
}));

describe('ReviewsList', () => {
  it('renders reviews list', () => {
    render(<ReviewsList reviews={reviews as any} />);
    expect(screen.getAllByText(/Comment/)).toHaveLength(3);
  });
});
