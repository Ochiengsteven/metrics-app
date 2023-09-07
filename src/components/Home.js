import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { fetchAssets, selectAllAssets, selectAssetsStatus } from '../redux/actions/actionsSlice';
import Header from './Header';
import './assets/css/load.css';

export default function Home() {
  const dispatch = useDispatch();
  const cryptoData = useSelector(selectAllAssets);
  const assetsStatus = useSelector(selectAssetsStatus);

  // State variables for card display
  const [displayCount, setDisplayCount] = useState(6); // Initial display count
  const increment = 4; // Number of cards to add on "View More" click
  const [filteredCryptoData, setFilteredCryptoData] = useState(cryptoData);
  // eslint-disable-next-line no-unused-vars
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (assetsStatus === 'idle') {
      dispatch(fetchAssets());
    }
  }, [assetsStatus, dispatch]);

  const handleViewMoreClick = () => {
    setDisplayCount(displayCount + increment);
  };

  const filterCryptoData = useCallback(
    (query) => {
      // eslint-disable-next-line max-len
      const filteredData = cryptoData.filter((crypto) => crypto.pair.toLowerCase().includes(query.toLowerCase()));
      setFilteredCryptoData(filteredData);
      setSearchQuery(query);
    },
    [cryptoData],
  );

  let content;
  if (assetsStatus === 'loading') {
    // Loading animation
    content = (
      <div className="honeycomb">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  } else if (assetsStatus === 'succeeded') {
    content = (
      <React.Fragment key="crypto-content">
        {filteredCryptoData.slice(0, displayCount).map((crypto, index) => {
          const row = Math.floor(index / 2); // Calculate the row index
          const col = index % 2; // Calculate the column index

          // Background color based on row and column
          const backgroundColor = (row % 2 === 0 && col === 0) || (row % 2 !== 0 && col !== 0)
            ? '#202123'
            : '#444654';

          const uniqueKey = uuidv4();

          return (
            <Link
              to={`/crypto/${encodeURIComponent(crypto.pair)}/${crypto.exchange}`} // Unique identifier as the path
              className="crypto-card p-3"
              key={uniqueKey} // Unique identifier as the key
              style={{
                border: 'none',
                color: 'white',
                height: '30vh',
                backgroundColor,
              }}
            >
              <div className="flex justify-end">
                <FontAwesomeIcon className="border border-white rounded-full p-1" icon={faArrowRight} />
              </div>
              <h2 className="text-3xl font-extrabold pb-4">{crypto.pair}</h2>
              <h1 className="text-xl semi-extrabold">
                Exchange:&nbsp;
                <br />
                {crypto.exchange}
              </h1>
            </Link>
          );
        })}
        {displayCount < filteredCryptoData.length && (
          <button
            type="button"
            onClick={handleViewMoreClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 col-span-2"
          >
            View More
          </button>
        )}
      </React.Fragment>
    );
  }

  return (
    <div className="grid grid-cols-2">
      <Header className="col-span-2 background-image height" onSearch={filterCryptoData} />
      {content}
    </div>
  );
}
