import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
      {cryptoData.slice(0, displayCount).map((crypto, index) => {
        const row = Math.floor(index / 2); // Calculate the row index
        const col = index % 2; // Calculate the column index

        // Determine the background color based on row and column
        const backgroundColor = (row % 2 === 0 && col === 0) || (row % 2 !== 0 && col !== 0)
          ? '#202123'
          : '#444654';

        return (
          <Link
            to={`/crypto/${uuidv4()}`}
            className="crypto-card p-3"
            key={uuidv4()}
            style={{
              border: 'none',
              color: 'white',
              height: '30vh',
              backgroundColor,
            }}
          >
            <h2 className="text-3xl font-extrabold pb-4">{crypto.pair}</h2>
            <h1 className="text-xl semi-extrabold">
              Exchange:&nbsp;
              <br />
              {crypto.exchange}
            </h1>
          </Link>
        );
      })}
      {displayCount < cryptoData.length && (
        <button type="button" onClick={handleViewMoreClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 col-span-2">
          View More
        </button>
      )}
    </div>
  );
}

export default Home;
