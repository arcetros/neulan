import TableRow from './TableRow';

export default function Table() {
  return (
    <div className="mt4 overflow-auto">
      <table className="w-full whitespace-nowrap table-auto">
        <tbody className="block md:table-row-group overflow-y-auto w-screen">
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
        </tbody>
      </table>
    </div>
  );
}
