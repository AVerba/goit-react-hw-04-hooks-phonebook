import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import shortid from 'shortid';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

export const ContactForm = ({ addContact, contacts }) => {
  const [user, setUser] = useState({ name: '', number: '' });
  const [isDisabled, setIsDisabled] = useState(true);

  const resetForm = () => {
    setUser({ name: '', number: '' });
    setIsDisabled(true);
  };

  const formSubmitHandler = e => {
    e.preventDefault();
    const contact = {
      id: shortid.generate(),
      name: user.name,
      number: user.number,
    };
    if (contact.number.length <= 4)
      return Notify.failure(`Enter valid number ${contact.number}`);

    addContact(contact);
    resetForm();
  };
  useEffect(() => {
    if (user.name && user.number) setIsDisabled(false);
  }, [user.name, user.number]);

  const formChangeNameHandler = e => {
    const { name, value } = e.currentTarget;
    setUser(user => ({ ...user, [name]: value }));
  };
  const formChangePhoneHandler = phone => {
    setUser(user => ({ ...user, number: phone }));
  };
  const formCheckValueHandler = e => {
    console.log(user);
    const { value } = e.currentTarget;
    const nameRegex =
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
    if (!nameRegex.test(value) || value.length === 0) {
      return Notify.failure(
        'Enter valid name.The name should to contain only Alphabet letter. Try again'
      );
    }
    if (value) {
      const contactFinder = contacts.find(
        contact =>
          contact.name.toLowerCase() ===
          value.toLowerCase().replace(/ +/g, ' ').trim()
      );
      if (contactFinder) {
        setIsDisabled(true);
        Notify.warning(`${value} is already in contacts.`);
      }
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className={styles.form}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={user.name}
          onChange={e => formChangeNameHandler(e)}
          onBlur={e => formCheckValueHandler(e)}
        />
      </label>

      <label>
        Number:
        <PhoneInput
          country={'ua'}
          regions={'europe'}
          inputProps={{
            name: 'number',
            required: true,
            autoFocus: true,
          }}
          value={user.number}
          onChange={number => formChangePhoneHandler(number)}
        />
      </label>
      <button
        className={styles.submitButton}
        type="submit"
        disabled={isDisabled}
      >
        add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
};
