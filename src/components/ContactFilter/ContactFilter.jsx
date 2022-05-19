import styles from './ContactFilter.module.css';
import PropTypes from 'prop-types';

export const ContactFilter = ({ onInput, value }) => {
  return (
    <div className={styles.filter}>
      <p className={styles.text}>Find contacts by name</p>
      <input onChange={e => onInput(e)} value={value} />
    </div>
  );
};

ContactFilter.propTypes = {
  onInput: PropTypes.func,
};
