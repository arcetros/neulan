import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import weatherSlice from './weather-slice';

export const store = configureStore({
  reducer: { weather: weatherSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
