/* eslint-disable no-unsafe-optional-chaining */
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useMobile } from '@/hooks';
import { useSelector } from '@/store';
import { getLocalTime } from '@/helpers';

export function WeeklyChart() {
  const { isMobile } = useMobile();
  const { forecasts: currentForecast, isRequested: isLoading } = useSelector((state) => state.weather);

  const data = [
    {
      name: !isLoading && 'Today',
      temperature: Math.floor((currentForecast?.daily[0].temp.min + currentForecast?.daily[1].temp.max) / 2),
    },
    {
      name: !isLoading && getLocalTime(currentForecast?.daily[1].dt, currentForecast?.timezone).format('dddd'),
      temperature: Math.floor((currentForecast?.daily[1].temp.min + currentForecast?.daily[1].temp.max) / 2),
    },
    {
      name: !isLoading && getLocalTime(currentForecast?.daily[2].dt, currentForecast?.timezone).format('dddd'),
      temperature: Math.floor((currentForecast?.daily[2].temp.min + currentForecast?.daily[2].temp.max) / 2),
    },
    {
      name: !isLoading && getLocalTime(currentForecast?.daily[3].dt, currentForecast?.timezone).format('dddd'),
      temperature: Math.floor((currentForecast?.daily[3].temp.min + currentForecast?.daily[3].temp.max) / 2),
    },
    {
      name: !isLoading && getLocalTime(currentForecast?.daily[4].dt, currentForecast?.timezone).format('dddd'),
      temperature: Math.floor((currentForecast?.daily[4].temp.min + currentForecast?.daily[4].temp.max) / 2),
    },
    {
      name: !isLoading && getLocalTime(currentForecast?.daily[5].dt, currentForecast?.timezone).format('dddd'),
      temperature: Math.floor((currentForecast?.daily[5].temp.min + currentForecast?.daily[5].temp.max) / 2),
    },
    {
      name: !isLoading && getLocalTime(currentForecast?.daily[6].dt, currentForecast?.timezone).format('dddd'),
      temperature: Math.floor((currentForecast?.daily[6].temp.max + currentForecast?.daily[6].temp.min) / 2),
    },
  ];

  return (
    <div className="w-full mx-8 min-h-[400px] flex">
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 400} className="w-full m-auto">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="temperature" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#8899A6" />
          <YAxis
            stroke="#8899A6"
            orientation="right"
            type="number"
            domain={[(dataMin: number) => Math.floor(dataMin - 0.9), (dataMax: number) => Math.floor(dataMax * 1.04)]}
            allowDataOverflow
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="temperature"
            legendType="none"
            stroke="none"
            fillOpacity={1}
            fill="url(#temperature)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
