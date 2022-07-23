interface ITable {
  children: any;
}

export function Table({ children }: ITable) {
  return <div className="flex flex-col gap-y-2 mt-4 w-full">{children}</div>;
}
