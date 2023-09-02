import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import { fetchAssets, selectAllAssets, selectAssetsStatus } from '../redux/actions/actionsSlice';
import Header from './Header';

function Home() {
  const dispatch = useDispatch();
  const cryptoData = useSelector(selectAllAssets);
  const assetsStatus = useSelector(selectAssetsStatus);

  // State variables for card display
  const [displayCount, setDisplayCount] = useState(6); // Initial display count
  const increment = 4; // Number of cards to add on "View More" click

  useEffect(() => {
    if (assetsStatus === 'idle') {
      dispatch(fetchAssets());
    }
  }, [assetsStatus, dispatch]);

  // Function to handle "View More" button click
  const handleViewMoreClick = () => {
    setDisplayCount(displayCount + increment);
  };

  return (
    <div className="grid grid-cols-2">
      <Header className="col-span-2 background-image" />
      {cryptoData.slice(0, displayCount).map((crypto, index) => (
        <div
          className="crypto-card"
          key={uuidv4()}
          style={{
            border: 'none',
            color: 'white',
            height: '30vh',
            backgroundColor: index % 2 === 0 ? '#202123' : '#444654',
          }}
        >
          <h3>{crypto.pair}</h3>
          <p>
            price:&nbsp;
            {parseFloat(crypto.price).toFixed(2)}
          </p>
        </div>
      ))}
      {displayCount < cryptoData.length && (
        <button type="button" onClick={handleViewMoreClick} className="view-more-button">
          View More
        </button>
      )}
    </div>
  );
}

export default Home;
