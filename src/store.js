import { configureStore } from '@reduxjs/toolkit';
import footerReducer from './features/footer/footerSlice';

export const store = configureStore({
  reducer: {
    footer: footerReducer,
  },
});
