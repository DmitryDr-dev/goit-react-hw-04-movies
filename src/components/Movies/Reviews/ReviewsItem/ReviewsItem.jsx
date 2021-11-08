import PropTypes from 'prop-types';
import styles from './ReviewsItem.module.css';

export default function ReviewsItem({ review: { author, content } }) {
  return (
    <div className={styles.reviewWrap}>
      <h4 className={styles.reviewAuthor}>{author}</h4>
      <p className={styles.reviewContent}>{content}</p>
    </div>
  );
}

ReviewsItem.propTypes = {
  review: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
};
