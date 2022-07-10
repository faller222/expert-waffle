import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import medicReducer from '../features/medic/medicSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    medic: medicReducer,
  },
});
