import { useState } from 'react';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../mocks/offers';

type OffersListProps = {
  offers: Offer[];
}

function OffersList({ offers }: OffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);


  const handleMouseEnter = (id: string) => {
    setActiveOfferId(id);

  };


  const handleMouseLeave = () => {
    setActiveOfferId(null);

  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isActive={activeOfferId === offer.id}
        />
      ))}
    </div>
  );
}

export default OffersList;
