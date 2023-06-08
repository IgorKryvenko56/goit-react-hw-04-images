import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';
import { ReactComponent as SearchIcon } from  '../icons8-search.svg';


const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSearch(query);
  };

  const handleChange = event => {
    setQuery(event.target.value);
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">
            <SearchIcon className="search-icon" size={25} />
          </span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;