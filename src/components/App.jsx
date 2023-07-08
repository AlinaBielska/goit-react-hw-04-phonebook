import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import ContactForm from "./ContactForm/ContactForm";
import Filter from './Filter/Filter';
import ContactList from "./ContactList/ContactList";
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  
  const onInputChangeFilter = evt => {
    setFilter(evt.target.value);
  };

  const onSubmitContact = contact => {
    const newContact = { ...contact, id: nanoid() }
    setContacts([...contacts, newContact]);
  };

  const deleteContact = contactID => {
    setContacts(contacts.filter(el => el.id !== contactID));
  };

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (!storedContacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    } else {
      try {
        this.setState({ contacts: JSON.parse(storedContacts) });
      } catch (error) {
        console.log("Invalid JSON in localStorage: " + storedContacts);
      };
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={css.body}>
      <h1 className={css.title}>Phonebook</h1>
      <div className={css.wrapper}>
        <ContactForm
          contacts={contacts}
          onSubmitContact={onSubmitContact} />
        <div className={css.contacts}>
          <h2 className={css.contactsTitle} >Contacts</h2>
          <Filter
            filter={filter}
            onInputChangeFilter={onInputChangeFilter} />
          <ContactList
            contacts={contacts}
            filter={filter}
            deleteContact={deleteContact} />
        </div>
      </div>
    </div>
  );
};