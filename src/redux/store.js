import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './actions/actionsSlice';

const store = configureStore({

  reducer: {
    crypto: cryptoReducer,
  },
});

export default store;
