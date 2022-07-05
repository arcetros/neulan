import { useEffect } from 'react';
import { getGeo } from './store/weather-actions';
import { useDispatch } from './store';
import Overview from './components/Overview';
import CurrentForecast from './components/CurrentForecast';

function App() {
  const dispatch = useDispatch();

  let firstRender = true;

  useEffect(() => {
    if (firstRender) {
      dispatch(getGeo());
      firstRender = false;
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-between h-auto lg:h-screen overflow-x-hidden lg:overflow-hidden bg-white">
      <Overview />
      <CurrentForecast />
    </div>
  );
}

export default App;
