import { MdOutlineOpenInNew } from 'react-icons/md';
import moment from 'moment';
import momenttz from 'moment-timezone';
import useMobile from '../hooks/useMobile';
import { useSelector } from '../store';
import RainChart from './RainChart';
import { Date, Temperature, Location } from './UI/Skeleton/CurrentSkeleton';

export default function CurrentForecast() {
  const isMobile = useMobile();

  const currentWeather = useSelector((state) => state.weather?.current_weather);
  const currentForecast = useSelector((state) => state.weather?.forecasts);
  const dailyForecast = useSelector((state) => state.weather?.forecasts?.daily[0]);

  const now = moment();
  const offset = currentForecast?.timezone;
  const currentDate = momenttz.tz(now, offset);
  const currentTime = parseInt(momenttz.tz(now, offset).format('HH'), 10);

  let statusDay = 'Sunset';
  if (currentTime >= 20 || currentTime < 12) statusDay = 'Sunrise';

  const getStatus = (status: any) => {
    if (status) {
      const formatUnix = moment.unix(status).format();
      const formattedTime = momenttz.tz(formatUnix, offset);
      return formattedTime.format('LT');
    }

    return 'Loading';
  };

  return (
    <div className="order-first lg:order-last relative lg:sticky right-0 h-auto w-full lg:h-screen lg:w-[27rem] bg-primary overflow-y-hidden lg:overflow-y-auto">
      <div className="py-12 px-8">
        <div className="relative flex flex-col gap-y-16">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-8 text-white text-sm py-3">
              <span className="flex gap-x-2 items-center">
                Notificatons
                <span className="bg-red-500 px-2 py-1 rounded-md">4</span>
              </span>
              <span>Places</span>
            </div>
            <div className="flex items-center">
              <img
                src="https://prod-images-static.radiopaedia.org/images/52448145/2657bc7654a8668048a172d2f88691b4a71d480931d0d6e1336744b38ba448fe_jumbo.jpeg"
                alt="racoon"
                className="w-12 h-12 rounded-xl"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center justify-center gap-x-4">
                {currentWeather ? (
                  <>
                    <img
                      src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}${
                        isMobile ? '' : '@2x'
                      }.png`}
                      alt="Weather Icon"
                      className="relative"
                    />
                    <div className="flex flex-col gap-y-1 text-white">
                      <span className="text-xl tracking-wide ">Today</span>
                      <span className="text-gray-300 text-xs">{currentDate.format('dddd, MMMM DD')}</span>
                    </div>
                  </>
                ) : (
                  <Date />
                )}
              </div>
              <div className="flex flex-col gap-y-4 text-white">
                <div className={`flex justify-center ${!currentWeather && 'gap-x-4'}`}>
                  {currentWeather ? (
                    <>
                      <span className="font-thin tracking-wide text-8xl">{currentWeather?.main.temp.toFixed(0)}</span>
                      <span className="font-thin tracking-tighter text-3xl">°C</span>
                    </>
                  ) : (
                    <Temperature />
                  )}
                </div>
                {currentWeather ? (
                  <>
                    <span className="flex items-center gap-x-0.5 mx-auto text-gray-500 text-sm">
                      {currentWeather?.name}
                      {currentWeather && `, ${currentWeather?.sys.country}`}
                      <span>
                        <MdOutlineOpenInNew />
                      </span>
                    </span>
                    <span className="mx-auto text-gray-500">
                      Feels like {currentWeather?.main.feels_like.toFixed(0)} <span className="text-white mx-3">•</span>
                      {statusDay === 'Sunset' && `Sunset ${getStatus(dailyForecast?.sunset)}`}
                      {statusDay === 'Sunrise' && `Sunrise ${getStatus(dailyForecast?.sunrise)}`}
                    </span>
                  </>
                ) : (
                  <Location />
                )}
              </div>
            </div>
          </div>
          <RainChart />
        </div>
      </div>
    </div>
  );
}
