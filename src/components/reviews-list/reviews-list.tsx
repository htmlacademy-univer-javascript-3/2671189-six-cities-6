import { memo, useMemo } from 'react';
import Review from '../review/review';
import { Review as ReviewType } from '../../types/offer';

type ReviewsListProps = {
  reviews: ReviewType[];
};

function ReviewsListComponent({ reviews }: ReviewsListProps): JSX.Element {
  const sortedReviews = useMemo(
    () => [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10),
    [reviews]
  );

  return (
    <ul className="reviews__list">
      {sortedReviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
}

const ReviewsList = memo(ReviewsListComponent);

export default ReviewsList;
