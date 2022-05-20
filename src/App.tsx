import Overview from './components/Overview';
import CurrentForecast from './components/CurrentForecast';

function App() {
  return (
    <div className="flex flex-col lg:flex-row justify-between h-auto lg:h-screen overflow-x-hidden lg:overflow-hidden bg-secondary">
      <Overview />
      <CurrentForecast />
    </div>
  );
}

export default App;
