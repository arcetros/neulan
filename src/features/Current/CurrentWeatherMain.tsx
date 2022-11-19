import { Loader } from '@components/Element/Loader';
import { CurrentWeather } from 'type';
import { useMobile } from '@hooks/useMobile';

interface ICurrentWeatherMain {
  isRequested: boolean;
  data: CurrentWeather;
  units: string;
}

function CurrentWeatherMain({ isRequested, data, units }: ICurrentWeatherMain) {
  const isMobile = useMobile();
  const isMetric = units.match(/metric/i);
  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          {isRequested ? (
            <Loader type="Icon" />
          ) : (
            data && (
              <img
                src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}${isMobile ? '' : '@2x'}.png`}
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
              data && (
                <>
                  <div>
                    <span className="font-thin tracking-wide text-5xl">{data?.main.temp.toFixed(0)}</span>
                    <span className="font-thin tracking-tighter text-5xl">{isMetric ? '°C' : '°F'}</span>
                  </div>
                  <span className="capitalize w-28 text-right">{data?.weather[0].description}</span>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherMain;
