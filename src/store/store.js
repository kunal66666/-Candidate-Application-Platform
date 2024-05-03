import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './features/jobsSlice';

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});

export default store;
