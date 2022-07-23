import { useEffect } from 'react';
import { getGeo } from './store/weather-actions';
import { useDispatch, useSelector, store } from './store';
import { Overview, Current } from '@/features';

function App() {
  const townName = useSelector((state) => state?.weather?.current_weather?.name);
  const dispatch = useDispatch();

  let firstRender = true;

  useEffect(() => {
    if (firstRender) {
      dispatch(getGeo(store.getState().weather.units));
      firstRender = false;
    }
  }, []);

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
    <div className="flex flex-col lg:flex-row justify-between h-auto lg:h-screen overflow-x-hidden lg:overflow-hidden bg-gray-50">
      <Overview />
      <Current />
    </div>
  );
}

export default App;
