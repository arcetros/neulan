import * as variants from './variants';
import { useSelector } from '@/store';
import { Forecasts } from '@/types';

export type ICard = {
  type: keyof typeof variants;
  data: Forecasts;
  calculatedData: number;
  isMetric: RegExpMatchArray | null;
};

export function Card({ type, data, calculatedData, isMetric }: ICard) {
  const isLoading = useSelector((state) => state.weather?.isRequested);
  const cardType = variants;
  const Cards = cardType[type] && cardType[type];
  return (
    <div
      className={`px-8 w-full flex items-center justify-between h-24 rounded-md ${
        isLoading && 'bg-gray-100 dark:bg-dark100 animate-pulse'
      }`}
    >
      {!isLoading && <Cards data={data} calculatedData={calculatedData} isMetric={isMetric} />}
    </div>
  );
}
