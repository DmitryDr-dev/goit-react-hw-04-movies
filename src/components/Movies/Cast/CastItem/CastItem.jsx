import PropTypes from 'prop-types';
import styles from './CastItem.module.css';

export default function CastItem({ actor: { profile_path, name, character } }) {
  return (
    <>
      <div className={styles.castItemPhotoWrap}>
        <img
          srcSet={
            profile_path
              ? `https://image.tmdb.org/t/p/w154/${profile_path} 154w,
                https://image.tmdb.org/t/p/w342/${profile_path} 342w,
                https://image.tmdb.org/t/p/w500/${profile_path} 500w,
                https://image.tmdb.org/t/p/w780/${profile_path} 780w`
              : 'https://via.placeholder.com/300x475'
          }
          sizes="300px"
          src={
            profile_path
              ? `https://image.tmdb.org/t/p/w342/${profile_path}`
              : `https://via.placeholder.com/300x475`
          }
          alt={name}
          className={styles.castItemPhoto}
        />
      </div>
      <div className={styles.castItemInfo}>
        <h4 className={styles.castItemInfoName}>{name}</h4>
        <span className={styles.castItemInfoCharacter}>
          Character: {character}
        </span>
      </div>
    </>
  );
}

CastItem.propTypes = {
  actor: PropTypes.shape({
    profile_path: PropTypes.string,
    name: PropTypes.string.isRequired,
    character: PropTypes.string.isRequired,
  }),
};
