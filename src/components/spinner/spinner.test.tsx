import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Spinner from './spinner';

describe('Spinner component', () => {
  it('renders spinner container', () => {
    const { container } = render(<Spinner />);

    const spinnerContainer = container.querySelector('.spinner-container');
    expect(spinnerContainer).toBeInTheDocument();
  });

  it('renders spinner element', () => {
    const { container } = render(<Spinner />);

    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('displays loading text', () => {
    const { container } = render(<Spinner />);

    const text = container.querySelector('.spinner-text');
    expect(text).toBeInTheDocument();
    expect(text?.textContent).toBe('Loading offers...');
  });
});
