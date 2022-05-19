import styles from './Container.module.css';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const Container = ({ className, children }) => {
  const classList = cx(styles.container, className);
  return <div className={classList}>{children}</div>;
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
