import styles from './ContactList.module.css';

import PropTypes from 'prop-types';
import { Title } from '../ui/Title';

export const ContactList = ({ contacts, deleteContact }) => {
  const renderList = (
    <ul className={styles.contactsList}>
      {contacts.map(({ name, id, number }) => (
        <li className={styles.listItem} key={id} id={id}>
          <div className={styles.info}>
            <span className={styles.contactName}>{name}: </span>
            <span className={styles.phoneNumber}>{number}</span>
          </div>
          <button className={styles.buttons} onClick={e => deleteContact(e)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );

  return contacts.length !== 0 ? renderList : 'You have no contacts';
};
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
