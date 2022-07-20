import React from 'react';
import * as types from './Card-type';
import { useSelector } from '../../store';
import { Forecasts } from '../../types';

interface ICard {
  type: keyof typeof types;
  data: Forecasts;
  calculatedData: number;
  isMetric?: RegExpMatchArray | null;
}

export default function Card({ type, data, calculatedData, isMetric }: ICard) {
  const isLoading = useSelector((state) => state.weather?.isRequested);
  const cardType = types;
  const Cards = cardType[type] && cardType[type];
  return (
    <div className={`px-8 w-full flex items-center justify-between h-24 rounded-md ${isLoading && 'animate-pulse'}`}>
      {!isLoading && <Cards data={data} calculatedData={calculatedData} isMetric={isMetric} />}
    </div>
  );
}
