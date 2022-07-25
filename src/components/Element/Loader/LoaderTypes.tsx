export function Name() {
  return <div className="w-full my-auto h-4 bg-gray-500 bg-opacity-20 rounded-full animate-pulse" />;
}

export function Country() {
  return <div className="w-1/2 my-auto h-2 bg-gray-500 bg-opacity-20 rounded-full animate-pulse" />;
}

export function Date() {
  return <div className="w-full my-auto h-2 bg-gray-500 bg-opacity-20 rounded-full animate-pulse" />;
}

export function MainDate() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="w-1/3 my-auto h-6 bg-gray-500 bg-opacity-20 rounded-full animate-pulse" />
      <div className="w-2/3 my-auto h-4 bg-gray-500 bg-opacity-20 rounded-full animate-pulse" />
    </div>
  );
}

export function Icon() {
  return <div className="w-1/2 my-auto h-16 bg-gray-500 bg-opacity-20 rounded-md animate-pulse" />;
}

export function WeatherDescription() {
  return (
    <div className="w-full flex justify-between">
      <div className="w-1/2 my-auto h-12 bg-gray-500 bg-opacity-20 rounded-md animate-pulse" />
      <div className="w-1/3 my-auto h-12 bg-gray-500 bg-opacity-20 rounded-md animate-pulse" />
    </div>
  );
}

export function Message() {
  return (
    <div className="flex mx-8 mt-3 gap-x-3">
      <div className=" w-1/3 h-4 bg-gray-500 bg-opacity-20 animate-pulse rounded-lg" />
      <div className=" w-24 h-4 bg-gray-500 bg-opacity-20 animate-pulse rounded-lg" />
    </div>
  );
}

export function SunCard() {
  return <div className="w-full my-auto h-2 bg-gray-500 bg-opacity-20 rounded-full animate-pulse" />;
}
