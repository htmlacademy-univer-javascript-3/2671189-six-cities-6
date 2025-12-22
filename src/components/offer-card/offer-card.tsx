import { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Offer } from '../../types/offer';
import { toggleFavorite } from '../../store/action';
import { AppDispatch } from '../../store';
import { AppRoute } from '../../const';
import { selectIsAuthenticated } from '../../store/selectors';

type OfferCardProps = {
  offer: Offer;
  isActive: boolean;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}

function OfferCardComponent({ offer, onMouseEnter, onMouseLeave, isActive }: OfferCardProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleMouseEnter = () => {
    onMouseEnter(offer.id);
  };

  const handleFavoriteClick = useCallback(() => {
    if (!isAuthenticated) {
      navigate(AppRoute.Login);
      return;
    }
    
    dispatch(toggleFavorite({
      offerId: offer.id,
      status: offer.isFavorite ? 0 : 1
    }));
  }, [dispatch, navigate, isAuthenticated, offer.id, offer.isFavorite]);

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ opacity: isActive ? 1 : 0.6 }}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

const OfferCard = memo(OfferCardComponent);
export default OfferCard;
