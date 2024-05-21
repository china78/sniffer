import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sniffData: [],
  currentSniffDes: ''
};

export const sniffSlice = createSlice({
  name: 'sniff',
  initialState,
  reducers: {
    setSniff: (state, action) => {
      state.sniffData.push(action.payload);
    },
    setCurrentSniffDetails: (state, action) => {
      console.log('000', action)
      state.currentSniffDes = action.payload
    }
  }
});

export const { setSniff, setCurrentSniffDetails } = sniffSlice.actions;

export const getSniffData = (state) => state.sniff.sniffData;
export const getCurrentSniffDes = (state) => state.sniff.currentSniffDes;

export default sniffSlice.reducer;
