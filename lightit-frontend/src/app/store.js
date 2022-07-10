import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import medicReducer from '../features/medic/medicSlice';
import diagnosisReducer from '../features/diagnosis/diagnosisSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    medic: medicReducer,
    diagnosis: diagnosisReducer,
  },
});
