/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GeoModel, CurrentWeather, CityModel, CityArrayModel, Forecasts, SelectedCity } from '../types';

const initialWeatherState: CityArrayModel = {
  my_location: null as any,
  cities: [],
  selected_city: null as any,
  current_weather: null as any,
  forecasts: null as any,
  isRequested: false,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState: initialWeatherState,
  reducers: {
    getGeo(state, action: PayloadAction<GeoModel>) {
      state.my_location = action.payload;
    },
    addWeather(state, action: PayloadAction<CurrentWeather>) {
      state.current_weather = action.payload;
    },
    addCity(state, action: PayloadAction<CityModel[]>) {
      state.cities = action.payload;
    },
    selectCity(state, action: PayloadAction<SelectedCity>) {
      state.selected_city = action.payload;
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
