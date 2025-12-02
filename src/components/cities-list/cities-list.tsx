import { useDispatch } from 'react-redux';
import { changeCity } from '../../store/action';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

type CitiesListProps = {
  currentCity: string;
};

function CitiesList({ currentCity }: CitiesListProps): JSX.Element {
  const dispatch = useDispatch();

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
                  dispatch(changeCity(city));
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

export default CitiesList;
