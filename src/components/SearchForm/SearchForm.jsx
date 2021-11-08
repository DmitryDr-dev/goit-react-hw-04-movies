import { useState } from 'react';
import styles from './SearchForm.module.css';

export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(query);

    setQuery('');
  };

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <label htmlFor="2b0d7b3dcb6d" className="searchFormLabel">
        Search for movies
      </label>
      <input
        type="text"
        className="searchFormInput"
        id="2b0d7b3dcb6d"
        onChange={handleInputChange}
        value={query}
      />
      <button type="submit" className="searchFormButton">
        Search
      </button>
    </form>
  );
}
