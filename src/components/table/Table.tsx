import React from 'react';
import {useTable} from 'react-table';

import {TableHeader} from './components/TableHeader';
import {Column, Data} from './typing';

export type TableProps<HeaderId extends string> = {
  columns: Column<HeaderId>[];
  data: Data<HeaderId>[];
};

type TableComponent = ReturnType<React.FC>;

export const Table = <HeaderId extends string>({
  columns,
  data,
}: TableProps<HeaderId>): TableComponent => {
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({columns, data});

  return (
    <table {...getTableProps()} className="border-2 w-full">
      <TableHeader headerGroups={headerGroups} />

      <tbody className="border-2" {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            // eslint-disable-next-line react/jsx-key
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                // eslint-disable-next-line react/jsx-key
                <td
                  className="border-2 p-2 text-center capitalize"
                  {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export * from './typing';
