import React, { useRef, useCallback } from 'react';

interface ITableCell {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
  content: any;
  disable: (state: any) => typeof state;
}

export function TableRow({ children, onClick, isActive, disable, content }: ITableCell) {
  const contentSpace = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    onClick();
    if (isActive) {
      disable(null);
    }
  }, [isActive]);

  return (
    <div className="flex flex-col justify-between min-w-full h-full">
      <div
        className={`flex items-center h-12 hover:bg-gray-50 dark:hover:bg-dark100 rounded-lg cursor-pointer ${
          isActive && 'bg-gray-50 dark:bg-dark100'
        }`}
        onClick={handleClick}
        aria-hidden
      >
        {children}
      </div>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${!isActive ? '0px' : `${contentSpace.current?.scrollHeight}px`}` }}
        className="overflow-hidden transition-max-height duration-700 ease-in-out"
        aria-hidden
      >
        <div className="py-5 px-4">{content}</div>
      </div>
    </div>
  );
}
