import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Review from './review';

describe('Review', () => {
  it('renders single review', () => {
    render(
      <Review
        review={{ id: 'r1', date: new Date().toISOString(), comment: 'Nice place', rating: 5, user: { name: 'Alice', avatarUrl: '', isPro: true } } as any}
      />
    );
    expect(screen.getByText('Nice place')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });
});
