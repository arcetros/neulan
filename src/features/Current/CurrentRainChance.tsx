import { RainChart } from '@components/Element/RainChart';
import { Forecasts, HourlyForecast } from 'type';

interface ICurrentRainChance {
  hourlyData: HourlyForecast[];
  currentForecast: Forecasts;
  timezone: string;
  isRequested: boolean;
}

export default function CurrentRainChance({ currentForecast, hourlyData, timezone, isRequested }: ICurrentRainChance) {
  const rainIndex = [0, 3, 6, 9];
  const rainProps = { currentForecast, isRequested };
  return (
    <div className="relative flex flex-col gap-y-6">
      <h1 className="text-white">Chance Of Rain</h1>
      <div className="w-full h-full">
        <div className="flex flex-col justify-between min-h-full gap-y-4 h-44">
          {rainIndex.map((item) => (
            <RainChart
              {...rainProps}
              percent={`${hourlyData && Math.floor(hourlyData[item].pop * 100)}%`}
              dateTime={{ dt: hourlyData && hourlyData[item].dt, offset: timezone && timezone }}
              key={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
