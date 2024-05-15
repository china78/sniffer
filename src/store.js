import { configureStore } from '@reduxjs/toolkit';
import footerReducer from './features/footer/footerSlice';
import sniffReducer from './features/sniff/sniffSlice';

export const store = configureStore({
  reducer: {
    footer: footerReducer,
    sniff: sniffReducer
  },
});
