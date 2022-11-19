import { useSelector } from '@store/index';
import { getSunStatus } from '@helpers/getSunStatus';

import CurrentSunStatus from './CurrentSunStatus';
import CurrentRainChance from './CurrentRainChance';
import CurrentHeader from './CurrentHeader';
import CurrentWeatherMain from './CurrentWeatherMain';

export function Current() {
  const {
    isRequested,
    units,
    current_weather: currentWeather,
    forecasts: currentForecast,
  } = useSelector((state) => state.weather);

  const dailyForecast = useSelector((state) => state.weather?.forecasts?.daily[0]);

  const offset = currentForecast?.timezone;

  return (
    <>
      <CurrentHeader isRequested={isRequested} data={currentWeather} offset={currentForecast?.timezone} />
      <CurrentWeatherMain isRequested={isRequested} data={currentWeather} units={units} />
      <CurrentRainChance
        currentForecast={currentForecast}
        hourlyData={currentForecast?.hourly}
        timezone={currentForecast?.timezone}
        isRequested={isRequested}
      />
      <div className="flex flex-col gap-y-3">
        <CurrentSunStatus
          status="Sunrise"
          isWhen={getSunStatus(dailyForecast?.sunrise, 'when', isRequested, offset)}
          isBeforeAfter={getSunStatus(dailyForecast?.sunrise, 'calendar', isRequested, offset)}
        />
        <CurrentSunStatus
          status="Sunset"
          isWhen={getSunStatus(dailyForecast?.sunset, 'when', isRequested, offset)}
          isBeforeAfter={getSunStatus(dailyForecast?.sunset, 'calendar', isRequested, offset)}
        />
      </div>
    </>
  );
}
