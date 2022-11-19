interface IOverviewSetting {
  toggle: boolean;
  handleUnits: () => {
    payload: any;
    type: string;
  };
  handleDarkMode: () => void;
  darkMode: boolean;
  isMetric: RegExpMatchArray | null;
}

function OverviewSetting({ toggle, handleUnits, handleDarkMode, darkMode, isMetric }: IOverviewSetting) {
  return (
    <div
      className={`absolute right-0 top-8 bg-white dark:bg-dark100 rounded w-fit p-1 z-10 text-xs shadow transition-all duration-200 ${
        toggle ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {toggle && (
        <ul className="flex flex-col gap-y-3">
          <li
            className="hover:bg-slate-100 dark:hover:bg-dark300 p-4 rounded cursor-pointer"
            onClick={handleUnits}
            aria-hidden
          >
            Change unit to {isMetric ? 'Imperial' : 'Metric'}
          </li>
          <li
            className="hover:bg-slate-100 dark:hover:bg-dark300 p-4 rounded cursor-pointer"
            onClick={handleDarkMode}
            aria-hidden
          >
            Switch to {darkMode ? 'Light' : 'Dark'} mode
          </li>
        </ul>
      )}
    </div>
  );
}

export default OverviewSetting;
