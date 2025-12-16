import { useState, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { SortType } from '../../const';
import { changeSortType } from '../../store/action';

type SortOptionsProps = {
  currentSort: SortType;
}

const SORT_OPTIONS = [
  SortType.Popular,
  SortType.PriceLowToHigh,
  SortType.PriceHighToLow,
  SortType.TopRatedFirst,
];

function SortOptionsComponent({ currentSort }: SortOptionsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSortClick = useCallback((sortType: SortType) => {
    dispatch(changeSortType(sortType));
    setIsOpen(false);
  }, [dispatch]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SORT_OPTIONS.map((sortType) => (
          <li
            key={sortType}
            className={`places__option ${sortType === currentSort ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortClick(sortType)}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

const SortOptions = memo(SortOptionsComponent);
export default SortOptions;
