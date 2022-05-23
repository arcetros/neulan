/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityModel, CityArrayModel } from '../types';

const initialWeatherState: CityArrayModel = {
  all_cities: [],
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState: initialWeatherState,
  reducers: {
    addCity(state, action: PayloadAction<CityModel[]>) {
      state.all_cities = action.payload;
    },
  },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;
