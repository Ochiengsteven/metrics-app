import React from 'react';
import PropTypes from 'prop-types';
import './assets/css/header.css';

export default function Header({ className }) {
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
    </div>
  );
}

// Prop validation
Header.propTypes = {
  className: PropTypes.string.isRequired,
};
