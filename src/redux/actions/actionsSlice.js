import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'https://api.coinstats.app/public/v1/markets?coinId=bitcoin';

export const fetchAssets = createAsyncThunk('assets/fetchAssets', async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    assets: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assets = state.assets.concat(action.payload);
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllAssets = (state) => state.crypto.assets;
export const selectAssetsStatus = (state) => state.crypto.status;
export const selectAssetsError = (state) => state.crypto.error;

export default cryptoSlice.reducer;
