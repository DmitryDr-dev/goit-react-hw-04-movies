import { useState, useEffect } from 'react';
import {
  Route,
  useLocation,
  useHistory,
  useParams,
  useRouteMatch,
  NavLink,
} from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import movieApi from '../../services/themoviedbApi/themoviedbApi';
import Loader from '../../components/Loader';
import MovieInfo from '../../components/Movies/MovieInfo';
import Section from '../../components/Section';
import Container from '../../components/Container';
import Cast from '../../components/Movies/Cast';
import Reviews from '../../components/Movies/Reviews';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [status, setStatus] = useState(Status.IDLE);
  const [movie, setMovie] = useState([]);

  // console.log(history);
  // console.log(location);
  // console.log(movieId);
  // console.log(url);
  // console.log(path);

  useEffect(() => {
    try {
      setStatus(Status.PENDING);
      movieApi.fetchMovieById(movieId).then(resp => {
        setMovie(resp);
        setStatus(Status.RESOLVED);
      });
    } catch (error) {
      setStatus(Status.REJECTED);
      console.log("Houston, we've got a problem: ", error.message);
    }
  }, [movieId]);

  const handleBackButtonClick = () => {
    history.push(location?.state?.from?.location || '/movies');
  };

  switch (status) {
    case Status.IDLE:
      return null;
    case Status.PENDING:
      return <Loader />;
    case Status.RESOLVED:
      return (
        <Section>
          <Container>
            <button onClick={handleBackButtonClick}>Back</button>
            <MovieInfo movie={movie} />
          </Container>
          <ul>
            <li>
              <NavLink
                to={`${url}/cast`}
                className={styles.movieDetailsLink}
                activeClassName={styles.activeMovieDetailsLink}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${url}/reviews`}
                className={styles.movieDetailsLink}
                activeClassName={styles.activeMovieDetailsLink}
              >
                Reviews
              </NavLink>
            </li>
          </ul>

          <Route path={`${path}/cast`}>
            <Cast />
          </Route>
          <Route path={`${path}/reviews`}>
            <Reviews />
          </Route>
        </Section>
      );
    case Status.REJECTED:
      return <h2>Houston, we've got a problem. Nothing found for you</h2>;
    default:
      return;
  }
}
