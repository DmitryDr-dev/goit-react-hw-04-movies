import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import movieApi from '../../services/themoviedbApi/themoviedbApi';
import Hero from '../../components/Hero';
import Loader from '../../components/Loader';
import Section from '../../components/Section';
import Container from '../../components/Container';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const location = useLocation();

  useEffect(() => {
    const abortController = new AbortController();

    try {
      setStatus(Status.PENDING);
      movieApi
        .fetchTrendingMovies({
          signal: abortController.signal,
        })
        .then(resp => {
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
  }, []);

  switch (status) {
    case Status.IDLE:
      return <Hero />;
    case Status.PENDING:
      return <Loader />;
    case Status.REJECTED:
      return <h2>Houston, we've got a problem. Nothing found for you</h2>;
    case Status.RESOLVED:
      return (
        <>
          <Hero />
          <Section title="Trending Movies">
            <Container>
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
            </Container>
          </Section>
        </>
      );
    default:
      return;
  }
}
