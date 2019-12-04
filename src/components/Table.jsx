import React from 'react'
import styled from 'styled-components'
//@ts-ignore
import { useTable, useSortBy } from 'react-table'
import dataJS from '../data/cleaned/s2015.json';
// const data: JurisdictionData[] = dataJS

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    margin-top: 5rem;


    thead {
      position: fixed !important;
      top: 0;
      background-color: #282c34;
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
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
  )

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.splice(20)

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
          {firstPageRows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
    </>
  )
}

const DollarCell = ({ cell }) => {
  if(cell.value) {
    return '$' + (cell.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').slice(0, -3);
  } 
  return null
}

const DateCell = ({ cell }) => {
  if(cell.value) {
    return formatDate(new Date(cell.value))
  } 
  return null
}

function formatDate(date) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Novr", "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return `${ monthNames[monthIndex]} ${day} ${year}`
}

const DetailColumns = (name) => [
  {
    Header: 'Total',
    accessor: `${name}.Total`,
    Cell: DollarCell,
    maxWidth: 50,
  },
  {
    Header: 'Sewer',
    accessor: `${name}.Sewer`,
    Cell: DollarCell,
    maxWidth: 50,
  },
  {
    Header: 'Fire',
    accessor: `${name}.Fire`,
    Cell: DollarCell,
    maxWidth: 50,
  },
]

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
            accessor: 'Updated',
            Cell: DateCell
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
  )

  const data = React.useMemo(() => dataJS, [])

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}
