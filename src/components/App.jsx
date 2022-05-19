import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import styles from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import { ContactFilter } from './ContactFilter';
import { ContactList } from './ContactList';
import { Title } from './ui/Title';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      { id: 'id-5', name: 'Tome Cruse', number: '224-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const contactsData = JSON.parse(contacts);

    if (contactsData) {
      this.setState({ contacts: contactsData });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const newContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (newContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(newContacts));
    }
  }

  addContact = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  filterInputHandler = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  contactAfterFilter = () => {
    return [...this.state.contacts].filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLocaleLowerCase())
    );
  };

  deleteContact = e => {
    const elemToRemove = e.currentTarget.parentNode.id;
    this.setState({
      contacts: this.state.contacts.filter(item => item.id !== elemToRemove),
    });
  };

  render() {
    return (
      <div className={styles.ContactForm}>
        <ContactForm
          addContact={this.addContact}
          contacts={this.state.contacts}
        />

        <Title>Contacts</Title>
        <ContactFilter
          onInput={this.filterInputHandler}
          value={this.state.filter}
        />
        <ContactList
          contacts={this.contactAfterFilter()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
