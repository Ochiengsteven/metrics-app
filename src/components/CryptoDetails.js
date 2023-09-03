import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllAssets } from '../redux/actions/actionsSlice';

function CryptoDetails() {
  const { uuid } = useParams();
  const cryptoData = useSelector(selectAllAssets);

  const crypto = cryptoData.find((crypto) => crypto.uuid === uuid);

  return (
    <div className="min-h-screen" style={{ width: '100vw', background: '#fff' }}>
      {crypto && (
        <div className="bg-white rounded-lg shadow-lg">
          <div className="details-bg">
            <Link to="/" className="text-white hover:text-blue-600 text-2xl font-semibold">
              &lt; Back
            </Link>
            <h1 className="text-3xl mt-4 mb-6">
              Crypto Details for
              <br />
              {crypto.pair}
            </h1>
          </div>
          <div className="grid grid-rows-3 gap-4 p-4">
            <div className="row-span-1 text-3xl font-semibold pb-4">
              Exchange:&nbsp;
              {crypto.exchange}
            </div>
            <div className="row-span-1 text-2xl pb-3">
              Price:&nbsp;&nbsp;
              {parseFloat(crypto.price).toFixed(2)}
            </div>
            <div className="row-span-1 text-2xl pb-3">
              Volume:&nbsp;&nbsp;
              {crypto.volume}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CryptoDetails;
