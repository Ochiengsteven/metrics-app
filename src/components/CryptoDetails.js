import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllAssets } from '../redux/actions/actionsSlice';

function CryptoDetails() {
  const { uuid } = useParams();
  const cryptoData = useSelector(selectAllAssets);

  const crypto = cryptoData.find((crypto) => crypto.uuid === uuid);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#fff' }}>
      {crypto && (
        <div className="bg-white">
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            &lt; Back to home
          </Link>
          <h1>
            Crypto Details for
            {crypto.pair}
          </h1>
          <p>
            Exchange:
            {crypto.exchange}
          </p>
          <p>
            Price:
            {parseFloat(crypto.price).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}

export default CryptoDetails;
