import React from 'react';
import moment from 'moment';
import momenttz from 'moment-timezone';
import { getName } from 'country-list';
import { useMobile } from '@/hooks/useMobile';
import { useSelector } from '@/store';
import { RainChance } from './RainChance';
import { Loader } from '@/components/Element/Loader';
import { SunStatus } from './SunStatus';
import { getSunStatus } from '@/helpers';

export function Content() {
  const isMobile = useMobile();
  const {
    // message,
    isRequested,
    units,
    current_weather: currentWeather,
    forecasts: currentForecast,
  } = useSelector((state) => state.weather);

  const dailyForecast = useSelector((state) => state.weather?.forecasts?.daily[0]);

  const isMetric = units.match(/metric/i);

  const now = moment();
  const offset = currentForecast?.timezone;
  const currentDate = momenttz.tz(now, offset);
  return (
    <>
      <div className="flex items-center gap-x-4">
        <div className={`flex flex-col w-[70%] ${isRequested && 'gap-y-8'} `}>
          <span className="text-xl md:text-2xl text-gray-200">
            {isRequested ? <Loader type="Name" /> : currentWeather?.name}
          </span>

          <span className="text-sm md:text-base text-gray-300 font-thin">
            {isRequested ? <Loader type="Country" /> : currentWeather && getName(currentWeather?.sys?.country)}
          </span>
        </div>
        <span className="text-right text-lg md:text-xl text-gray-200 w-[30%]">
          {isRequested ? <Loader type="Date" /> : currentWeather && currentDate.format('HH:mm A')}
        </span>
      </div>
      <div className="w-full">
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-4">
            {isRequested ? (
              <Loader type="Icon" />
            ) : (
              currentWeather && (
                <img
                  src={`http://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}${
                    isMobile ? '' : '@2x'
                  }.png`}
                  alt="Weather Icon"
                  className="relative w-16 h-16"
                />
              )
            )}
          </div>
          <div className="flex flex-col gap-y-4 text-gray-200 font-light">
            <div className="flex items-center justify-between border-[hsla(214,34%,38%,1)] dark:border-dark100 border-b pb-4">
              {isRequested ? (
                <Loader type="WeatherDescription" />
              ) : (
                currentWeather && (
                  <>
                    <div>
                      <span className="font-thin tracking-wide text-5xl">{currentWeather?.main.temp.toFixed(0)}</span>
                      <span className="font-thin tracking-tighter text-5xl">{isMetric ? '°C' : '°F'}</span>
                    </div>
                    <span className="capitalize w-28 text-right">{currentWeather?.weather[0].description}</span>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <RainChance />
      <div className="flex flex-col gap-y-3">
        <SunStatus
          status="Sunrise"
          isWhen={getSunStatus(dailyForecast?.sunrise, 'when', isRequested, offset)}
          isBeforeAfter={getSunStatus(dailyForecast?.sunrise, 'calendar', isRequested, offset)}
        />
        <SunStatus
          status="Sunset"
          isWhen={getSunStatus(dailyForecast?.sunset, 'when', isRequested, offset)}
          isBeforeAfter={getSunStatus(dailyForecast?.sunset, 'calendar', isRequested, offset)}
        />
      </div>
    </>
  );
}
