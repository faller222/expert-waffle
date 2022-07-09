import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import medicReducer from '../features/medic/medicSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    medic: medicReducer,
  },
});
