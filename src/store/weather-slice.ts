/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityModel, CityArrayModel, SelectedCity } from '../types';

const initialWeatherState: CityArrayModel = {
  my_location: null as any,
  cities: [],
  selected_city: null as any,
  current_weather: null as any,
  forecasts: null as any,
  isRequested: false,
  message: '',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState: initialWeatherState,
  reducers: {
    addCity(state, action: PayloadAction<CityModel[]>) {
      state.cities = action.payload;
    },
    selectCity(state, action: PayloadAction<SelectedCity>) {
      state.selected_city = action.payload;
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
  },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;
