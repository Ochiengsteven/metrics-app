import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from 'lodash.debounce';
import './assets/css/header.css';

export default function Header({ className, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Create a debounced search function to delay the filtering
  const debouncedSearch = debounce((query) => {
    onSearch(query);
  }, 300);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  useEffect(() => {
    if (searchQuery === '') {
      onSearch(searchQuery);
    }
  }, [searchQuery, onSearch]);

  return (
    <div className={className}>
      <h1 className="text-5xl font-extrabold w-full pb-4">CryptoView</h1>
      <h3 className="text-3xl font-semibold w-full back3">
        Research the&nbsp;
        <br />
        crypto
        <br />
        market
      </h3>
      <input
        type="text"
        placeholder="Search by pair..."
        className="border rounded p-2 text-black focus:outline-none mt-2 w-5/6"
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
}

// Prop validation
Header.propTypes = {
  className: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};
