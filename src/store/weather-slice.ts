/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Forecasts } from '../types';

export interface WeatherState {
  cityData?: {};
  forecasts: Forecasts[];
}

const initialState: WeatherState = {
  cityData: [],
  forecasts: [],
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addCity(state, action: PayloadAction<WeatherState>) {
      state.cityData = action.payload;
    },
  },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;
