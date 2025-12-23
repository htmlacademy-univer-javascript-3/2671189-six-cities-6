import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritesEmptyPage from './favorites-empty-page';

describe('FavoritesEmptyPage', () => {
  it('renders favorites empty state', () => {
    render(
      <MemoryRouter>
        <FavoritesEmptyPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });
});
