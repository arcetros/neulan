import React, { useRef, useCallback } from 'react';

interface ITableCell {
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  content?: any;
  disable: (state: any) => typeof state;
}

export default function TableRow({ children, onClick, isActive, disable, content }: ITableCell) {
  const contentSpace = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    onClick();
    if (isActive) {
      disable(null);
    }
  }, [isActive]);

  return (
    <div className="flex flex-col min-w-full">
      <div
        className="flex items-center justify-between h-24 border border-gray-1 hover:bg-gray-100 rounded-lg bg-slate-50"
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
        <div className="bg-slate-50 py-5 px-4">{content}</div>
      </div>
    </div>
  );
}
