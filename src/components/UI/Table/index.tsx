import TableRow from './TableRow';

export default function Table() {
  return (
    <div className="mt4 overflow-x-auto">
      <table className="w-full whitespace-nowrap table-auto">
        <tbody>
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
