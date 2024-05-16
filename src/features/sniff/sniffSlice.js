import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sniffData: []
};

export const sniffSlice = createSlice({
  name: 'sniff',
  initialState,
  reducers: {
    setSniff: (state, action) => {
      state.sniffData.push(action.payload);
    },
  }
});

export const { setSniff } = sniffSlice.actions;

export const getSniffData = (state) => state.sniff.sniffData;

export default sniffSlice.reducer;
