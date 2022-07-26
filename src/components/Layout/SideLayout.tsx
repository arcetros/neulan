import React from 'react';

interface ISideLayout {
  children: React.ReactNode;
}

export function SideLayout({ children }: ISideLayout) {
  return (
    <div className="order-first lg:order-last relative lg:sticky right-0 h-full w-full lg:w-[25rem] dark:bg-[#1c2535] dark:bg-none bg-gradient-to-t from-[#0b2a63] via-[#0f2746] to-[#324968] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
      <div className="p-8 relative flex flex-col justify-between gap-y-10">{children}</div>
    </div>
  );
}
