/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityModel, CityArrayModel, Forecasts } from '../types';

const initialWeatherState: CityArrayModel = {
  all_cities: [],
  isRequested: false,
  forecasts: null as any,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState: initialWeatherState,
  reducers: {
    addCity(state, action: PayloadAction<CityModel[]>) {
      state.all_cities = action.payload;
    },
    addForecast(state, action: PayloadAction<Forecasts>) {
      state.forecasts = action.payload;
    },
    forecastRequested(state) {
      state.forecasts = initialWeatherState.forecasts;
      state.isRequested = true;
    },
    forecastReceived(state) {
      state.isRequested = false;
    },
  },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;
