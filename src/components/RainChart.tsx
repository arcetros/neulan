import { useSelector } from '../store';

interface IIsActive {
  isActive: boolean;
  percent: string;
}

function Chart({ isActive, percent }: IIsActive) {
  return (
    <div className="relative">
      <div
        className={`absolute bottom-0 ${isActive ? 'bg-yellow-400' : 'bg-gray-700'} w-[10px] rounded z-10`}
        style={{ height: percent && percent }}
      />
      <div className="absolute bottom-0 left-[0.9px] transform translate-x-1/2 z-0 border-l-gray-700 border-dashed border-l-2 w-1 h-full" />
    </div>
  );
}

export default function RainChart() {
  const items = useSelector((state) => state.weather?.forecasts?.hourly);

  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-white">Chance Of Rain</h1>
      <div className="w-full h-full">
        <div className=" flex justify-between mr-3 h-full">
          <div className="flex flex-col justify-between text-gray-400 text-xs h-36">
            <span>heavy rain</span>
            <span>rainy</span>
            <span>sunny</span>
          </div>
          <Chart isActive={false} percent={`${items && items[0].pop * 100}%`} />
          <Chart isActive={false} percent={`${items && items[3].pop * 100}%`} />
          <Chart isActive={false} percent={`${items && items[6].pop * 100}%`} />
          <Chart isActive percent={`${items && items[9].pop * 100}%`} />
          <Chart isActive={false} percent={`${items && items[12].pop * 100}%`} />
          <Chart isActive={false} percent={`${items && items[15].pop * 100}%`} />
        </div>
      </div>
    </div>
  );
}
