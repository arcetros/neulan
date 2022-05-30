import React, { useRef, useCallback } from 'react';

interface ITableCell {
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  disable: (state: any) => typeof state;
}

export default function TableRow({ children, onClick, isActive, disable }: ITableCell) {
  const contentSpace = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    onClick();
    if (isActive) {
      disable(null);
    }
  }, [isActive]);

  return (
    <div className="flex flex-col">
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
        <div className="bg-slate-50 py-10 px-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas repellendus tempore nisi reiciendis quas
          quibusdam at debitis soluta aliquam sint eaque maxime incidunt quidem similique rem sapiente, iusto ratione
          vel?
        </div>
      </div>
    </div>
  );
}
