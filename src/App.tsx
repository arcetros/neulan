import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getGeo, fetchForecast } from '@/store/weather-actions';
import { weatherActions } from '@/store/weather-slice';
import { useDispatch, useSelector, store } from '@/store';
import { Overview, Current } from '@/features';

function App() {
  const { isRequested } = useSelector((state) => state?.weather);
  const townName = useSelector((state) => state?.weather?.current_weather?.name);
  const dispatch = useDispatch();

  const firstRender = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const latCoord = searchParams.get('lat');
  const lonCoord = searchParams.get('lon');
  const unitParams = searchParams.get('units');

  const newSort = {
    lat: `${store.getState().weather.current_weather?.coord.lat}`,
    lon: `${store.getState().weather.current_weather?.coord.lon}`,
    units: `${store.getState().weather.units}`,
  };
  const newSearchParams = new URLSearchParams({ lat: newSort.lat, lon: newSort.lon, units: newSort.units });

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getGeo(store.getState().weather.units));
    };

    if (!firstRender.current) {
      if (latCoord && lonCoord && unitParams) {
        if (unitParams !== store.getState().weather.units) {
          dispatch(weatherActions.changeUnits(unitParams));
        }
        dispatch(fetchForecast(parseFloat(latCoord), parseFloat(lonCoord), unitParams));
      } else {
        fetch().then(() => {
          setSearchParams(newSearchParams);
        });
      }

      firstRender.current = true;
    }
    setSearchParams(newSearchParams);
  }, [isRequested]);

  useEffect(() => {
    const prevTitle = document.title;
    if (!townName) {
      document.title = `${prevTitle} — Loading`;
    } else {
      document.title = `${prevTitle} — ${townName}`;
    }
    return () => {
      document.title = prevTitle;
    };
  }, [townName]);

  return (
    <div className="flex flex-col lg:flex-row justify-between h-auto lg:h-screen overflow-x-hidden lg:overflow-hidden bg-gray-50 dark:bg-dark300 transition duration-200">
      <Overview />
      <Current />
    </div>
  );
}

export default App;
