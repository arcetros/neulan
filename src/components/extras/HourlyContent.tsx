import React from 'react';
import { IoMdSpeedometer, BsDroplet, GiSunRadiations } from '../UI/Icons';
import { HourlyForecast } from '../../types';

interface IHourlyContent {
  item: HourlyForecast;
}

export default function HourlyContent({ item }: IHourlyContent) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col text-xs">
          <span className="font-bold capitalize">{item.weather[0].description}</span>
          <span>The temperature will be {item.temp.toFixed(0)}°</span>
        </div>
        <div className="flex flex-col gap-y-0.5 text-xs">
          <div className="flex gap-1 items-center">
            <GiSunRadiations />
            <span className="">UVI {item.uvi.toFixed(0)}</span>
          </div>
          <div className="flex gap-1 items-center">
            <BsDroplet />
            <span>Humidity {item.humidity}%</span>
          </div>
          <div className="flex gap-1 items-center">
            <IoMdSpeedometer />
            <span>Preassure {item.pressure}hpa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
