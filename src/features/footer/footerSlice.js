import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  smelling: false
};

export const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {
    setSmelling: (state) => {
      const newSmell = !state.smelling;
      state.smelling = newSmell;
      window.electronAPI.actionSniffer(newSmell);
    },
  }
});

export const { setSmelling } = footerSlice.actions;

export const getSmelling = (state) => state.footer.smelling;

// export const inversion = () => (dispatch, getState) => {
//   const currentSmelling = getSmelling(getState());
//   dispatch(setSmelling(!currentSmelling));
// };

export default footerSlice.reducer;
