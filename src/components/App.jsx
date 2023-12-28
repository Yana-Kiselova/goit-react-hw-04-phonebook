import React, { useEffect, useState } from 'react';
import { FormContact } from './FormContact/FormContact';
import { Contacts } from './Contacts/Contacts';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsLocalStor = JSON.parse(localStorage.getItem('key'));
    if (contactsLocalStor) {
      setContacts(contactsLocalStor);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('key', JSON.stringify(contacts));
    console.log(contacts);
  }, [contacts]);

  // проверяем есть в contacts хотябы 1 контакт с именем name => алерт, в противном случае создаем новый и распушиваем старий
  const formSubmit = ({ name, number }) => {
    if (contacts.some(contact => contact.name === name)) {
      return alert(`${name} is already in contacts!`);
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts([...contacts, newContact]);
  };

  const onSearch = e => {
    setFilter(e.target.value);
  };

  // отфильтрованные контакты
  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContactItem = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };
  return (
    <div className="conteiner">
      <Section title={'Phonebook'}>
        <FormContact onSubmit={formSubmit} />
      </Section>
      <Section title={'Contacts'}>
        <Filter onSearch={onSearch} />
        <Contacts
          contacts={filteredContacts()}
          deleteContactItem={deleteContactItem}
        />
      </Section>
    </div>
  );
};
