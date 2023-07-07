import React, { Component } from "react";
import { nanoid } from 'nanoid';
import ContactForm from "./ContactForm/ContactForm";
import Filter from './Filter/Filter';
import ContactList from "./ContactList/ContactList";
import css from './App.module.css';

export class App extends Component { 
  state = {
    contacts: [],
    filter: ''
  };
  
  onInputChangeFilter = evt => {
    this.setState({ filter: evt.target.value });
  };

  onSubmitContact = contact => {
    const { contacts } = this.state;
    const newContact = { ...contact, id: nanoid() }
    this.setState({
      contacts: [...contacts, newContact]
    });
  };

  deleteContact = contactID => {
    this.setState({ contacts: this.state.contacts.filter(el => el.id !== contactID) });
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem("contacts");
    if (!storedContacts) {
      localStorage.setItem("contacts", JSON.stringify([]));
    } else {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;

    return (
      <div className={css.body}>
        <h1 className={css.title}>Phonebook</h1>
        <div className={css.wrapper}>
          <ContactForm contacts={contacts} onSubmitContact={this.onSubmitContact} />
          <div className={css.contacts}>
            <h2 className={css.contactsTitle} >Contacts</h2>
            <Filter filter={filter} onInputChangeFilter={this.onInputChangeFilter} />
            <ContactList contacts={contacts} filter={filter} deleteContact={this.deleteContact} />
          </div>
        </div>
      </div>
    );
}
}
