import React, { Component } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import shortid from 'shortid';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    isDisabled: true,
  };
  resetForm = () => {
    this.setState({ name: '', number: '', id: '', isDisabled: true });
  };

  formSubmitHandler = e => {
    e.preventDefault();
    const contact = {
      id: shortid.generate(),
      name: this.state.name,
      number: this.state.number,
    };
    if (this.state.number.length <= 4)
      return Notify.failure('Enter valid number');

    this.props.addContact(contact);
    this.resetForm();
  };

  formChangeHandler = e => {
    const { name, value } = e.currentTarget;
    this.setState({ isDisabled: false, [name]: value });
  };
  formCheckValueHandler = e => {
    const { value } = e.currentTarget;
    const nameRegex =
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
    if (!nameRegex.test(value) || value.length === 0) {
      return Notify.failure(
        'Enter valid name.The name should to contain only Alphabet letter. Try again'
      );
    }
    if (value) {
      const contactFinder = this.props.contacts.find(
        contact =>
          contact.name.toLowerCase() ===
          value.toLowerCase().replace(/ +/g, ' ').trim()
      );
      if (contactFinder) {
        this.setState({ isDisabled: true });
        Notify.warning(`${value} is already in contacts.`);
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.formSubmitHandler} className={styles.form}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={this.state.name}
            onChange={e => this.formChangeHandler(e)}
            onBlur={e => this.formCheckValueHandler(e)}
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
            value={this.state.number}
            onChange={number => this.setState({ number })}
          />
        </label>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={this.state.isDisabled}
        >
          add contact
        </button>
      </form>
    );
  }
}
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
