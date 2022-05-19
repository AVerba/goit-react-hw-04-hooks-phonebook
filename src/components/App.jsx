import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import styles from './App.module.css';
import { ContactForm } from './ContactForm';
import { ContactFilter } from './ContactFilter';
import { ContactList } from './ContactList';
import { Title } from './ui/Title';

export const App = () => {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    { id: 'id-5', name: 'Tome Cruse', number: '224-91-26' },
  ];

  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const contactsData = JSON.parse(contacts);

    if (contactsData) {
      setContacts(contactsData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    setContacts(contacts => [...contacts, contact]);
  };

  const filterInputHandler = e => {
    setFilter(e.currentTarget.value);
  };
  const contactAfterFilter = () => {
    return [...contacts].filter(contact =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  const deleteContact = e => {
    const elemToRemove = e.currentTarget.parentNode.id;
    setContacts(contacts.filter(item => item.id !== elemToRemove));
  };

  return (
    <div className={styles.ContactForm}>
      <ContactForm addContact={addContact} contacts={contacts} />

      <Title className={styles.contact} title="Contacts" />
      <ContactFilter onInput={filterInputHandler} value={filter} />
      <ContactList
        contacts={contactAfterFilter()}
        deleteContact={deleteContact}
      />
    </div>
  );
};
