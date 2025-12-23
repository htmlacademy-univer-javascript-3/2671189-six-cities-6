import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainEmptyPage from './main-empty-page';

describe('MainEmptyPage', () => {
  it('renders empty state with city', () => {
    render(<MainEmptyPage city="Amsterdam" />);
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/Amsterdam/)).toBeInTheDocument();
  });
});
