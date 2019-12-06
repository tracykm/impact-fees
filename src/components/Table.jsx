import React from 'react';
//@ts-ignore
import {useTable, useSortBy} from 'react-table';
import data from '../data/cleaned/nestedData.json';
import {DollarCell, DateCell} from './Cell';
import TableStyles from './TableStyles';
const dataJS = Object.values(data);

function Table({columns, data}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows;

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

const DetailColumns = name => [
  {
    Header: 'Total',
    accessor: `DataEntries[1].${name}.Total`,
    Cell: DollarCell,
    maxWidth: 50,
  },
  {
    Header: 'Sewer',
    accessor: `DataEntries[1].${name}.Sewer`,
    Cell: DollarCell,
    maxWidth: 50,
  },
  {
    Header: 'Fire',
    accessor: `DataEntries[1].${name}.Fire`,
    Cell: DollarCell,
    maxWidth: 50,
  },
];

export function BasicTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Basic Info',
        columns: [
          {
            Header: 'State',
            accessor: 'State',
            width: 500,
          },
          {
            Header: 'County',
            accessor: 'County',
          },
          {
            Header: 'Jurisdiction',
            accessor: 'Jurisdiction',
          },
          {
            Header: 'Updated',
            accessor: 'DataEntries[1].Updated',
            Cell: DateCell,
          },
        ],
      },
      {
        Header: 'Single Family',
        columns: DetailColumns('SingleFamily'),
      },
      {
        Header: 'Multi Family',
        columns: DetailColumns('MultiFamily'),
      },
      {
        Header: 'Retail',
        columns: DetailColumns('Retail'),
      },
      {
        Header: 'Office',
        columns: DetailColumns('Office'),
      },
      {
        Header: 'Industrial',
        columns: DetailColumns('Industrial'),
      },
    ],
    []
  );

  const data = React.useMemo(() => dataJS, []);

  return (
    <TableStyles>
      <Table columns={columns} data={data} />
    </TableStyles>
  );
}
