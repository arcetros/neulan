import React from 'react';

interface ITableCell {
  children: React.ReactNode;
  className: string;
}

export function TableCell({ children, className }: ITableCell) {
  return <div className={`font-medium text-gray-500 px-4 ${className}`}>{children}</div>;
}
