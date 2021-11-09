import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import movieApi from '../../services/themoviedbApi/themoviedbApi';
import Section from '../../components/Section';
import Container from '../../components/Container';
import SearchForm from '../../components/SearchForm';
import Loader from '../../components/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesPage() {
  const [movies, setMovies] = useState(() => {
    return JSON.parse(window.localStorage.getItem('movies')) ?? [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const location = useLocation();
  const history = useHistory();

  console.log('location', location);
  console.log('history', history);

  const formSubmitHandler = newQuery => {
    setSearchQuery(newQuery);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const abortController = new AbortController();

    try {
      setStatus(Status.PENDING);

      movieApi
        .fetchMovieByName(searchQuery, {
          signal: abortController.signal,
        })
        .then(resp => {
          history.push({ ...location, search: `query=${searchQuery}` });
          setMovies(resp.results);
          setStatus(Status.RESOLVED);
        });
    } catch (error) {
      setStatus(Status.REJECTED);
      console.log("Houston, we've got a problem: ", error.message);
    }

    return () => {
      abortController.abort();
    };
  }, [searchQuery]);

  useEffect(() => {
    window.localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  switch (status) {
    case Status.IDLE:
      return (
        <Section>
          <Container>
            <SearchForm onSubmit={formSubmitHandler} />
            {location.search && (
              <ul>
                {movies.map(movie => (
                  <li key={movie?.id}>
                    <Link // to={`/movies/${movie?.id}`
                      to={{
                        pathname: `/movies/${movie?.id}`,
                        state: {
                          from: { location, label: `back to movies` },
                        },
                      }}
                    >
                      {movie?.original_title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </Section>
      );
    case Status.PENDING:
      return <Loader />;
    case Status.REJECTED:
      return <h2>Houston, we've got a problem. Nothing found for you</h2>;
    case Status.RESOLVED:
      return (
        <Section>
          <Container>
            <SearchForm onSubmit={formSubmitHandler} />
            {movies && (
              <ul>
                {movies.map(movie => (
                  <li key={movie?.id}>
                    <Link // to={`/movies/${movie?.id}`
                      to={{
                        pathname: `/movies/${movie?.id}`,
                        state: {
                          from: { location, label: `back to movies` },
                        },
                      }}
                    >
                      {movie?.original_title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </Section>
      );
    default:
      return;
  }
}
