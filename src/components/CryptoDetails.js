/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faMicrophone, faGear } from '@fortawesome/free-solid-svg-icons';
import { selectAllAssets } from '../redux/actions/actionsSlice';
import './assets/css/details.css';

function CryptoDetails() {
  const { uuid } = useParams();
  const cryptoData = useSelector(selectAllAssets);

  const crypto = cryptoData.find((crypto) => crypto.uuid === uuid);

  return (
    <div className="min-h-screen" style={{ width: '100vw', background: '#202123' }}>
      {crypto && (
        <div className="bg-black shadow-lg">
          <div className="details-bg">
            <Link to="/" className="text-white text-xl font-semibold flex justify-between showbg">
              <FontAwesomeIcon icon={faAngleLeft} />
              <p className="inline-block ml-2">Details</p>
              <div className="inline-block ml-2 pr-3">
                <FontAwesomeIcon className="pr-3" icon={faMicrophone} />
                <FontAwesomeIcon icon={faGear} />
              </div>
            </Link>
            <h1 className="text-3xl mt-4 mb-6 back4">
              Crypto Details for
              <br />
              {crypto.pair}
            </h1>
          </div>
          <div className="grid grid-rows-3 bg-black text-white">
            <div style={{ background: '#202123', height: '12vh', textAlign: 'center' }} className="row-span-1 text-2xl font-bold p-4 rounded-t-lg">
              Exchange:&nbsp;
              {crypto.exchange}
            </div>
            <div style={{ background: '#444654' }} className="row-span-1 text-2xl p-4">
              Price:&nbsp;&nbsp;
              {parseFloat(crypto.price).toFixed(2)}
            </div>
            <div style={{ background: '#202123' }} className="row-span-1 text-2xl p-4">
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
