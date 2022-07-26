import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getGeo, fetchForecast } from '@/store/weather-actions';
import { weatherActions } from '@/store/weather-slice';
import { useDispatch, useSelector, store } from '@/store';
import { Overview, Current } from '@/features';

function App() {
  const { isRequested, current_weather: forecasts } = useSelector((state) => state?.weather);
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
    if (!firstRender.current && latCoord && lonCoord && unitParams) {
      if (latCoord === 'undefined') {
        if (unitParams !== store.getState().weather.units) {
          dispatch(weatherActions.changeUnits(unitParams));
        }
        dispatch(getGeo(store.getState().weather.units));
      } else {
        dispatch(fetchForecast(parseFloat(latCoord), parseFloat(lonCoord), unitParams));
      }
    }

    if (firstRender.current === false) {
      firstRender.current = true;
      if (!latCoord || !lonCoord) {
        dispatch(getGeo(store.getState().weather.units));
      } else if (latCoord && lonCoord && !unitParams)
        dispatch(fetchForecast(parseFloat(latCoord), parseFloat(lonCoord), store.getState().weather.units));
    }

    setSearchParams(newSearchParams);
  }, [isRequested]);

  useEffect(() => {
    const prevTitle = document.title;
    if (!forecasts?.name) {
      document.title = `${prevTitle} — Loading`;
    } else {
      document.title = `${prevTitle} — ${forecasts.name}`;
    }
    return () => {
      document.title = prevTitle;
    };
  }, [forecasts]);

  return (
    <div className="flex flex-col lg:flex-row justify-between h-auto lg:h-screen overflow-x-hidden lg:overflow-hidden bg-gray-50 dark:bg-dark300">
      <Overview />
      <Current />
    </div>
  );
}

export default App;
