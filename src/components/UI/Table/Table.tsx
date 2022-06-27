import React, { memo } from 'react';

interface ITable {
  children: any;
  active: Boolean;
}

function Table({ children, active }: ITable) {
  return active && <div className="flex flex-col gap-y-2 mt-4 w-full">{children}</div>;
}

export default memo(Table);
