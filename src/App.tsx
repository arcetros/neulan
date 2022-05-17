import Overview from './components/Overview';
import CurrentForecast from './components/CurrentForecast';

function App() {
  return (
    <div className="flex justify-between h-screen overflow-hidden bg-secondary">
      <Overview />
      <CurrentForecast />
    </div>
  );
}

export default App;
