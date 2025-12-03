import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import OfferCard from '../offer-card/offer-card';
import Map from '../map/map';
import Spinner from '../spinner/spinner';
import CitiesList from '../cities-list/cities-list';
import SortOptions from '../sort-options/sort-options';
import { RootState, AppDispatch } from '../../store';
import { sortOffers } from '../../utils/sort';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logout } from '../../store/action';

function MainPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const city = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);
  const sortType = useSelector((state: RootState) => state.sortType);
  const isOffersLoading = useSelector((state: RootState) => state.isOffersLoading);
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);
  const userEmail = useSelector((state: RootState) => state.userEmail);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const filteredOffers = offers.filter((offer) => offer.city.name === city);
  const sortedOffers = sortOffers(filteredOffers, sortType);
  const cityLocation = sortedOffers[0]?.city.location;

  const handleLogout = () => {
    dispatch(logout());
  };
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
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">{userEmail}</span>
                        <span className="header__favorite-count">3</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#" onClick={handleLogout}>
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
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
                      offer={offer}
                      isActive={activeOfferId === offer.id}
                      onMouseEnter={() => setActiveOfferId(offer.id)}
                      onMouseLeave={() => setActiveOfferId(null)}
                    />
                  ))}
                </div>
              </section>
              <div className="cities__right-section">
                {cityLocation && <Map offers={sortedOffers} center={cityLocation} activeOfferId={activeOfferId} />}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
