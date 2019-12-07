import React from 'react';
//@ts-ignore
import {useTable, useSortBy, usePagination} from 'react-table';
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
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {pageIndex, pageSize},
  } = useTable(
    {
      columns,
      data,
      initialState: {pageSize: 20},
    },
    useSortBy,
    usePagination
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
          {page.map((row, i) => {
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

      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{width: '100px'}}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

const DetailColumns = name => [
  {
    Header: 'Total',
    accessor: `DataEntries[1].${name}.Total`,
    Cell: DollarCell,
  },
  {
    Header: 'NonUtil',
    accessor: `DataEntries[1].${name}.NonUtil`,
    Cell: DollarCell,
  },
  {
    Header: 'Sewer',
    accessor: `DataEntries[1].${name}.Sewer`,
    Cell: DollarCell,
  },
  {
    Header: 'Fire',
    accessor: `DataEntries[1].${name}.Fire`,
    Cell: DollarCell,
  },
  {
    Header: 'Parks',
    accessor: `DataEntries[1].${name}.Parks`,
    Cell: DollarCell,
  },
  {
    Header: 'Fire',
    accessor: `DataEntries[1].${name}.Fire`,
    Cell: DollarCell,
  },
  {
    Header: 'Library',
    accessor: `DataEntries[1].${name}.Library`,
    Cell: DollarCell,
  },
  {
    Header: 'Police',
    accessor: `DataEntries[1].${name}.Police`,
    Cell: DollarCell,
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
