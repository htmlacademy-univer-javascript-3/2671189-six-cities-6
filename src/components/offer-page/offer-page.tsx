import { useParams } from 'react-router-dom';
import ReviewForm from '../review-form/review-form';
import { Offer } from '../../mocks/offers';

type OfferPageProps = {
  offers: Offer[];
}

function OfferPage({ offers }: OfferPageProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const offer = offers.find((o) => o.id === id);

  if (!offer) {
    return <div>Offer not found</div>;
  }

  return (
    <div className="page">
      <header className="header">...</header>

      <main className="page__main page__main--offer">
        <section className="offer">
          {/* Gallery section remains the same */}
          <div className="offer__gallery-container container">...</div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {/* Offer details remain the same */}
              <div className="offer__mark">...</div>
              <div className="offer__name-wrapper">...</div>
              <div className="offer__rating rating">...</div>
              <ul className="offer__features">...</ul>
              <div className="offer__price">...</div>
              <div className="offer__inside">...</div>
              <div className="offer__host">...</div>

              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                <ul className="reviews__list">
                  <li className="reviews__item">...</li>
                </ul>

                {/* REPLACE the static form with ReviewForm component */}
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="offer__map map" style={{ height: '579px' }}>
            <Map offers={nearbyOffers} center={offer.city.location} />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {/* Nearby offers - you can filter offers from the same city */}
              {offers
                .filter((o) => o.id !== offer.id && o.city.name === offer.city.name)
                .slice(0, 3)
                .map((nearbyOffer) => (
                  <article key={nearbyOffer.id} className="near-places__card place-card">
                    <div className="near-places__image-wrapper place-card__image-wrapper">
                      <a href="#">
                        <img className="place-card__image" src={nearbyOffer.previewImage} width="260" height="200" alt="Place image" />
                      </a>
                    </div>
                    <div className="place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;{nearbyOffer.price}</b>
                          <span className="place-card__price-text">&#47;&nbsp;night</span>
                        </div>
                        <button className={`place-card__bookmark-button button ${nearbyOffer.isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
                          <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark"></use>
                          </svg>
                          <span className="visually-hidden">{nearbyOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style={{ width: `${nearbyOffer.rating * 20}%` }}></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <a href="#">{nearbyOffer.title}</a>
                      </h2>
                      <p className="place-card__type">{nearbyOffer.type}</p>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
