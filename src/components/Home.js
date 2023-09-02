/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssets, selectAllAssets, selectAssetsStatus } from '../redux/actions/actionsSlice';

function Home() {
  const dispatch = useDispatch();
  const cryptoData = useSelector(selectAllAssets);
  const assetsStatus = useSelector(selectAssetsStatus);

  useEffect(() => {
    if (assetsStatus === 'idle') {
      dispatch(fetchAssets());
    }
  }, [assetsStatus, dispatch]);

  return (
    <div>
      {cryptoData.map((crypto) => (
        <div className="crypto-card" key={crypto.volume}>
          <h3>{crypto.pair}</h3>
          {/* <p>{crypto.data[0].symbol}</p> */}
        </div>
      ))}
    </div>
  );
}

export default Home;
