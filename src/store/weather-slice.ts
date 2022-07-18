/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityModel, CityArrayModel } from '../types';

export const initialWeatherState: CityArrayModel = {
  my_location: null as any,
  cities: [],
  current_weather: null as any,
  forecasts: null as any,
  isRequested: true,
  message: '',
  units: 'imperial',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState: initialWeatherState,
  reducers: {
    addCity(state, action: PayloadAction<CityModel[]>) {
      state.cities = action.payload;
    },
    addForecast(state, action) {
      state.forecasts = action.payload.oneCall;
      state.current_weather = action.payload.daily;
      state.message = action.payload.message;
    },
    forecastRequested(state) {
      state.forecasts = initialWeatherState.forecasts;
      state.isRequested = true;
    },
    forecastReceived(state) {
      state.isRequested = false;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    changeUnits(state, action) {
      state.units = action.payload;
    },
  },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;
