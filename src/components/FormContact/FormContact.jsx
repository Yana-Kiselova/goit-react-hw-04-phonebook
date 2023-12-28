import React, { useState } from 'react';
import css from './FormContact.module.css';
import PropTypes from 'prop-types';

export const FormContact = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // Відповідає за оновлення стану
  const handleChange = event => {
    const { name, value } = event.target;
    console.log(name);

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };
  // Викликається під час відправлення форми
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form} action="">
      <label className={css.label} htmlFor="name">
        Name
      </label>

      <input
        type="text"
        name="name"
        required
        value={name}
        onChange={event => handleChange(event)}
        id="name"
        className={css.input}
      />
      <label className={css.label} htmlFor="number">
        Number
      </label>

      <input
        type="tel"
        name="number"
        required
        value={number}
        onChange={event => handleChange(event)}
        id="number"
        className={css.input}
      />

      <button className={css.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};
FormContact.propTypes = {
  onSubmit: PropTypes.func,
};
