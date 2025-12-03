import { Link, useParams, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';
import Map from '../map/map';
import OffersList from '../offers-list/offers-list';
import Spinner from '../spinner/spinner';
import { RootState, AppDispatch } from '../../store';
import { fetchOfferDetails, fetchNearbyOffers, fetchComments } from '../../store/action';
import { AppRoute, AuthorizationStatus } from '../../const';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const offerDetails = useSelector((state: RootState) => state.offerDetails);
  const nearbyOffers = useSelector((state: RootState) => state.nearbyOffers);
  const comments = useSelector((state: RootState) => state.comments);
  const isOfferLoading = useSelector((state: RootState) => state.isOfferLoading);
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferDetails(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (!isOfferLoading && !offerDetails) {
    return <Navigate to={AppRoute.Main} />;
  }

  if (!offerDetails) {
    return null;
  }

  const isAuthenticated = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerDetails.images.slice(0, 6).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {offerDetails.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offerDetails.title}</h1>
                <button className={`offer__bookmark-button button ${offerDetails.isFavorite ? 'offer__bookmark-button--active' : ''}`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offerDetails.rating * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offerDetails.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offerDetails.type}</li>
                <li className="offer__feature offer__feature--bedrooms">{offerDetails.bedrooms} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max {offerDetails.maxAdults} adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offerDetails.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offerDetails.goods.map((good) => (
                    <li key={good} className="offer__inside-item">{good}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper user__avatar-wrapper ${offerDetails.host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                    <img className="offer__avatar user__avatar" src={offerDetails.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">{offerDetails.host.name}</span>
                  {offerDetails.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offerDetails.description}</p>
                </div>
              </div>

              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <ReviewsList reviews={comments} />
                {isAuthenticated && <ReviewForm offerId={offerDetails.id} />}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map offers={[...nearbyOffers, offerDetails]} center={offerDetails.city.location} activeOfferId={offerDetails.id} />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={nearbyOffers} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
