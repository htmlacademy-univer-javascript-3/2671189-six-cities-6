import Review from '../review/review';
import { Review as ReviewType } from '../../types/offer';

type ReviewsListProps = {
  reviews: ReviewType[];
};

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  const sortedReviews = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <ul className="reviews__list">
      {sortedReviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewsList;
