import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { changeCity } from '../../store/action';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

type CitiesListProps = {
  currentCity: string;
};

function CitiesListComponent({ currentCity }: CitiesListProps): JSX.Element {
  const dispatch = useDispatch();
  const handleCityClick = useCallback((city: string) => {
    dispatch(changeCity(city));
  }, [dispatch]);
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li key={city} className="locations__item">
              <a
                className={`locations__item-link tabs__item ${city === currentCity ? 'tabs__item--active' : ''}`}
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  handleCityClick(city);
                }}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const CitiesList = memo(CitiesListComponent);

export default CitiesList;
