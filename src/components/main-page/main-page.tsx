import { useState } from 'react';
import { useSelector } from 'react-redux';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import Spinner from '../spinner/spinner';
import { RootState } from '../../store';
import { sortOffers } from '../../utils/sort';

function MainPage(): JSX.Element {
  const city = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);
  const sortType = useSelector((state: RootState) => state.sortType);
  const isOffersLoading = useSelector((state: RootState) => state.isOffersLoading);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  
  const filteredOffers = offers.filter((offer) => offer.city.name === city);
  const sortedOffers = sortOffers(filteredOffers, sortType);
  const cityLocation = sortedOffers[0]?.city.location;
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList currentCity={city} />
          </section>
        </div>
        <div className="cities">
<<<<<<< HEAD
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList offers={offers} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={offers} />
              </section>
=======
          {isOffersLoading ? (
            <Spinner />
          ) : (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{sortedOffers.length} places to stay in {city}</b>
                <SortOptions currentSort={sortType} />
                <div className="cities__places-list places__list tabs__content">
                  {sortedOffers.map((offer) => (
                    <OfferCard
                      key={offer.id}
                      id={offer.id}
                      isPremium={offer.isPremium}
                      isFavorite={offer.isFavorite}
                      image={offer.previewImage}
                      price={offer.price}
                      rating={offer.rating}
                      title={offer.title}
                      type={offer.type}
                      onMouseEnter={() => setActiveOfferId(offer.id)}
                      onMouseLeave={() => setActiveOfferId(null)}
                    />
                  ))}
                </div>
              </section>
              <div className="cities__right-section">
                {cityLocation && <Map offers={sortedOffers} center={cityLocation} activeOfferId={activeOfferId} />}
              </div>
>>>>>>> d6a7b80 (feat(module7-task1): integrate server data fetching with axios and redux-thunk)
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
