import PropTypes from 'prop-types';

export default function Section({ children, title }) {
  return (
    <section className="section">
      {title && <div className="sectionTitle">{title}</div>}
      {children}
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};
