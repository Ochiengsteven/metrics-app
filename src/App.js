import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CryptoDetails from './components/CryptoDetails';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crypto/:cryptoId" element={<CryptoDetails />} />
      </Routes>
    </>
  );
}

export default App;
