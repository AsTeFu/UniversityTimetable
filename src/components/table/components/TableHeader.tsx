import {HeaderGroup} from 'react-table';
import {Data} from '../typing';

export type TableHeaderProps<HeaderId extends string> = {
  headerGroups: HeaderGroup<Data<HeaderId>>[];
};

type TableHeaderComponent = ReturnType<React.FC>;

export const TableHeader = <HeaderIdType extends string>({
  headerGroups,
}: TableHeaderProps<HeaderIdType>): TableHeaderComponent => (
  <thead>
    {headerGroups.map((headerGroup) => (
      // eslint-disable-next-line react/jsx-key
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          // eslint-disable-next-line react/jsx-key
          <th className="border-2 p-2" {...column.getHeaderProps()}>
            {column.render('Header')}
          </th>
        ))}
      </tr>
    ))}
  </thead>
);
