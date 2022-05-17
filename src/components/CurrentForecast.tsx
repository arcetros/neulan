import { TiWeatherDownpour } from 'react-icons/ti';
import { MdOutlineOpenInNew } from 'react-icons/md';
import RainChart from './RainChart';

export default function CurrentForecast() {
  return (
    <div className="sticky right-0 h-screen w-96 bg-primary overflow-y-auto">
      <div className="py-12 px-8">
        <div className="flex flex-col gap-y-16">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-8 text-white text-sm py-3">
              <span className="flex gap-x-2 items-center">
                Notificatons
                <span className="bg-red-500 px-2 py-1 rounded-md">4</span>
              </span>
              <span>Places</span>
            </div>
            <div className="flex items-center">
              <img
                src="https://prod-images-static.radiopaedia.org/images/52448145/2657bc7654a8668048a172d2f88691b4a71d480931d0d6e1336744b38ba448fe_jumbo.jpeg"
                alt="racoon"
                className="w-12 h-12 rounded-xl"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-y-4">
              <div className="flex justify-center items-center gap-x-4">
                <TiWeatherDownpour className="text-sky-500 w-9 h-10" />
                <div className="flex flex-col gap-y-1 text-white">
                  <span className="text-xl tracking-wide ">Today</span>
                  <span className="text-gray-300 text-xs">Saturday, 3 Aug</span>
                </div>
              </div>
              <div className="flex flex-col gap-y-4 text-white">
                <div className="flex mx-auto">
                  <span className="font-thin tracking-wide text-8xl">28</span>
                  <span className="font-thin tracking-tighter text-3xl">°C</span>
                </div>
                <span className="flex items-center gap-x-0.5 mx-auto text-gray-500 text-sm">
                  Berlin, Germany
                  <span>
                    <MdOutlineOpenInNew />
                  </span>
                </span>
                <span className="mx-auto text-gray-500">
                  Feels like 32 <span className="text-white mx-3">•</span> Sunset 20:15
                </span>
              </div>
            </div>
          </div>
          <RainChart />
        </div>
      </div>
    </div>
  );
}
