import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Reviews.module.css';
import movieApi from '../../../services/themoviedbApi/themoviedbApi';
import Loader from '../../Loader';
import ReviewsItem from './ReviewsItem';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function Reviews() {
  const { movieId } = useParams();
  const [status, setStatus] = useState(Status.IDLE);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    try {
      setStatus(Status.PENDING);
      movieApi
        .fetchMovieReviewsById(movieId, {
          signal: abortController.signal,
        })
        .then(resp => {
          setReviews(resp?.results);
          setStatus(Status.RESOLVED);
        });
    } catch (error) {
      setStatus(Status.REJECTED);
      console.log("Houston, we've got a problem: ", error.message);
    }

    return () => {
      abortController.abort();
    };
  }, [movieId]);

  switch (status) {
    case Status.IDLE:
      return null;
    case Status.PENDING:
      return <Loader />;
    case Status.RESOLVED:
      return (
        <>
          <h3 className={styles.reviewsTitle}>Reviews</h3>
          <ul className={styles.reviewsList}>
            {reviews.map(({ id, ...review }) => (
              <li key={id} className={styles.reviewsItem}>
                <ReviewsItem review={review} />
              </li>
            ))}
          </ul>
        </>
      );
    case Status.REJECTED:
      return <h2>Houston, we've got a problem. Nothing found for you</h2>;
    default:
      return;
  }

  // return <div className="">reviews</div>;
}
