import React from 'react';
//@ts-ignore
import {useTable, useSortBy, usePagination, useFilters} from 'react-table';
import data from '../data/cleaned/nestedData.json';
import {DollarCell, DateCell} from './Cell';
import TableStyles from './TableStyles';
const dataJS = Object.values(data);

// Define a default UI for filtering
function DefaultColumnFilter({
  column: {filterValue, preFilteredRows, setFilter},
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function Table({columns, data}) {
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

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
      defaultColumn,
    },
    useFilters,
    useSortBy,
    usePagination
  );

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

                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
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

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
  column: {filterValue, setFilter, preFilteredRows, id},
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={e => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  );
}

const DetailColumns = name => [
  {
    Header: 'Total',
    accessor: `DataEntries[1].${name}.Total`,
    Cell: DollarCell,
    Filter: SliderColumnFilter,
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
