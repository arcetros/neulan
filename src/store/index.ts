import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as useDispatchApp, useSelector as useSelectorApp } from 'react-redux';
import weatherSlice from './weather-slice';

export const store = configureStore({
  reducer: { weather: weatherSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useDispatchApp<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorApp;
export default store;
