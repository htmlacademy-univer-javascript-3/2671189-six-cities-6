import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SortOptions from './sort-options';
import { reducer } from '../../store/reducer';
import { SortType } from '../../const';

describe('SortOptions', () => {
  it('displays current sort type', () => {
    const store = configureStore({ reducer });
    const { container } = render(
      <Provider store={store}>
        <SortOptions currentSort={SortType.Popular} />
      </Provider>
    );

    const sortingType = container.querySelector('.places__sorting-type');
    expect(sortingType).toHaveTextContent(SortType.Popular);
  });

  it('toggles options list on click', () => {
    const store = configureStore({ reducer });
    const { container } = render(
      <Provider store={store}>
        <SortOptions currentSort={SortType.Popular} />
      </Provider>
    );

    const sortTypeElement = container.querySelector('.places__sorting-type') as HTMLElement;
    const optionsList = container.querySelector('.places__options');

    expect(optionsList).not.toHaveClass('places__options--opened');

    fireEvent.click(sortTypeElement);
    expect(optionsList).toHaveClass('places__options--opened');

    fireEvent.click(sortTypeElement);
    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('dispatches changeSortType action when option is selected', () => {
    const store = configureStore({ reducer });
    const { container } = render(
      <Provider store={store}>
        <SortOptions currentSort={SortType.Popular} />
      </Provider>
    );

    const sortTypeElement = container.querySelector('.places__sorting-type') as HTMLElement;
    fireEvent.click(sortTypeElement);

    const priceHighOption = Array.from(container.querySelectorAll('.places__option')).find(
      (el) => el.textContent === SortType.PriceHighToLow
    ) as HTMLElement;
    fireEvent.click(priceHighOption);

    expect(store.getState().sortType).toBe(SortType.PriceHighToLow);
  });

  it('closes options list after selection', () => {
    const store = configureStore({ reducer });
    const { container } = render(
      <Provider store={store}>
        <SortOptions currentSort={SortType.Popular} />
      </Provider>
    );

    const sortTypeElement = container.querySelector('.places__sorting-type') as HTMLElement;
    const optionsList = container.querySelector('.places__options');

    fireEvent.click(sortTypeElement);
    expect(optionsList).toHaveClass('places__options--opened');

    const topRatedOption = Array.from(container.querySelectorAll('.places__option')).find(
      (el) => el.textContent === SortType.TopRatedFirst
    ) as HTMLElement;
    fireEvent.click(topRatedOption);

    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('highlights active sort option', () => {
    const store = configureStore({ reducer });
    const { container } = render(
      <Provider store={store}>
        <SortOptions currentSort={SortType.PriceLowToHigh} />
      </Provider>
    );

    const activeOption = container.querySelector('.places__option--active');
    expect(activeOption).toHaveTextContent(SortType.PriceLowToHigh);
  });
});
