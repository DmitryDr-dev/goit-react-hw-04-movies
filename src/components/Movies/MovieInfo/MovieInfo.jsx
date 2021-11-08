import PropTypes from 'prop-types';

import styles from './MovieInfo.module.css';

export default function MovieInfo({ movie }) {
  const {
    poster_path,
    original_title,
    release_date,
    tagline,
    vote_average,
    vote_count,
    overview,
    genres,
  } = movie;

  const releaseDate = new Date(release_date);
  const releaseYear = releaseDate.getFullYear();

  return (
    <div className={styles.movieInfo}>
      <div className={styles.movieInfoImageWrap}>
        <img
          srcSet={
            poster_path
              ? `https://image.tmdb.org/t/p/w154/${poster_path} 154w,
                https://image.tmdb.org/t/p/w342/${poster_path} 342w,
                https://image.tmdb.org/t/p/w500/${poster_path} 500w,
                https://image.tmdb.org/t/p/w780/${poster_path} 780w,
                https://image.tmdb.org/t/p/original/${poster_path} 2000w`
              : 'https://via.placeholder.com/500x750'
          }
          sizes="500px"
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : `https://via.placeholder.com/500x750`
          }
          alt={original_title}
          className={styles.movieInfoPoster}
        />
      </div>
      <div className={styles.movieInfoDescription}>
        <h3 className={styles.movieInfoTitle}>{original_title}</h3>
        <div className={styles.movieInfoYear}>{releaseYear}</div>
        <blockquote className={styles.movieInfoTagLine}>{tagline}</blockquote>
        <div className={styles.movieInfoRating}>
          <h4 className={styles.movieInfoRatingTitle}>Ratings</h4>
          <ul className={styles.movieInfoRatingList}>
            <li className={styles.movieInfoRatingItem}>
              Average Vote: {vote_average}
            </li>
            <li className={styles.movieInfoRatingItem}>
              Vote Count: {vote_count}{' '}
            </li>
          </ul>
        </div>
        <div className={styles.movieInfoOverview}>
          <h4 className={styles.movieInfoOverviewTitle}>Overview</h4>
          <p className={styles.movieInfoOverviewDescription}>{overview}</p>
        </div>
        <div className={styles.movieInfoGenres}>
          <h4 className={styles.movieInfoGenresTitle}>Genres</h4>
          <ul className={styles.movieInfoGenresList}>
            {genres.map(genre => (
              <li key={genre?.id} className={styles.movieInfoGenresItem}>
                {genre?.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
MovieInfo.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    original_title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    vote_count: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ),
  }),
};
