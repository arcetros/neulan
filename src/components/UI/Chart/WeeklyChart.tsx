/* eslint-disable no-unsafe-optional-chaining */
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from '../../../store';
import getLocalTime from '../../../helpers/getLocalTime';
import useMobile from '../../../hooks/useMobile';

function WeeklyChart() {
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
    <ResponsiveContainer width={isMobile ? '100%' : '50%'} height={500} className="min-w-[50%]">
      <AreaChart
        data={data}
        margin={{
          top: 30,
          right: 30,
          left: 0,
          bottom: -10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          type="number"
          domain={[(dataMin: number) => Math.floor(dataMin - 0.9), (dataMax: number) => Math.floor(dataMax * 1.04)]}
          allowDataOverflow
        />
        <Tooltip />
        <Area type="monotone" dataKey="temperature" stroke="#8884d8" fillOpacity={1} fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default WeeklyChart;
