import React, { memo } from 'react';

interface ITable {
  children: any;
}

function Table({ children }: ITable) {
  return <div className="flex flex-col gap-y-2 mt-4 w-full">{children}</div>;
}

export default memo(Table);
