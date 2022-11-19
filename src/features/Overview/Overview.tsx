import { useSelector } from '@store/index';
import OverviewMainInfo from './OverviewMainInfo';
import OverviewDetailed from './OverviewDetailed';

function Overview() {
  const { units, isRequested, forecasts, message } = useSelector((state) => state.weather);

  return (
    <section className="h-full px-2 pb-8 lg:px-16">
      <OverviewMainInfo forecasts={forecasts} isRequested={isRequested} message={message} units={units} />
      <div className="my-8" />
      <OverviewDetailed forecasts={forecasts} isRequested={isRequested} units={units} />
    </section>
  );
}

export default Overview;
