import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Cast.module.css';
import movieApi from '../../../services/themoviedbApi/themoviedbApi';
import Loader from '../../Loader';
import CastItem from './CastItem';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function Cast() {
  const { movieId } = useParams();
  const [status, setStatus] = useState(Status.IDLE);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    try {
      setStatus(Status.PENDING);
      movieApi
        .fetchMovieCastById(movieId, {
          signal: abortController.signal,
        })
        .then(resp => {
          setCast(resp?.cast);
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
          <h3 className={styles.castTitle}>Cast</h3>
          <ul className={styles.castList}>
            {cast.map(({ id, ...actor }) => (
              <li key={id} className={styles.castItem}>
                <CastItem actor={actor} />
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
}
