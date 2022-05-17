import React from 'react';

interface IIsActive {
  isActive: boolean;
  percent: string;
}

function Chart({ isActive, percent }: IIsActive) {
  return (
    <div className="relative">
      <div
        className={`absolute bottom-0 ${isActive ? 'bg-yellow-400' : 'bg-gray-700'} ${percent} w-[10px] rounded z-10`}
      />
      <div className="absolute bottom-0 left-[0.9px] transform translate-x-1/2 z-0 border-l-gray-700 border-dashed border-l-2 w-1 h-full" />
    </div>
  );
}

export default function RainChart() {
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
          <Chart isActive={false} percent="h-[21%]" />
          <Chart isActive={false} percent="h-[19%]" />
          <Chart isActive={false} percent="h-[49%]" />
          <Chart isActive percent="h-[70%]" />
          <Chart isActive={false} percent="h-[29%]" />
          <Chart isActive={false} percent="h-[25%]" />
        </div>
      </div>
    </div>
  );
}
