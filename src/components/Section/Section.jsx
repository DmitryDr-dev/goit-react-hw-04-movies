import PropTypes from 'prop-types';

export default function Section({ children, title }) {
  return (
    <section className="section">
      {title && <h2 className="sectionTitle">{title}</h2>}
      {children}
    </section>
  );
}

Section.propTypes = {
  // children: PropTypes.array.isRequired,
  title: PropTypes.string,
};
