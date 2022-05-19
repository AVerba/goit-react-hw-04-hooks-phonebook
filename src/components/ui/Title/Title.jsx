import styles from './Title.module.css';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const Title = ({ className, title }) => {
  const classList = cx(styles.container, className);
  return <h1 className={classList}>{title}</h1>;
};

Title.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
};
