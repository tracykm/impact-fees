import React, { useState } from "react";
import {
  FaFireAlt,
  FaTree,
  FaWater,
  FaBook,
  FaShieldAlt
} from "react-icons/fa";
//@ts-ignore
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useBlockLayout
} from "react-table";
import { Link } from "react-router-dom";
import data from "../data/cleaned/nestedData.json";
import { DollarCell, DateCell } from "./Cell";
import TableStyles from "./TableStyles";
const dataJS = Object.values(data);

const SearchBar = ({ columns }) => {
  const [columnFilter, setColumnFilter] = useState(2);
  const currentCol = columns[0].columns[columnFilter];
  return (
    <div>
      <select
        onChange={e => {
          columns[0].columns[Number(e.target.value)].setFilter(
            currentCol.filterValue
          );
          currentCol.setFilter(undefined);
          setColumnFilter(Number(e.target.value));
        }}
      >
        <option value="2">Jurisdiction</option>
        <option value="1">County</option>
        <option value="0">State</option>
      </select>
      <input
        onChange={e => {
          currentCol.setFilter(e.target.value);
        }}
        placeholder="search..."
      />
    </div>
  );
};

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
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
    state: { pageIndex, pageSize },
    ...args
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 20 }
    },
    useBlockLayout,
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <SearchBar {...{ columns: args.columns }} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
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
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
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
    Header: "Total",
    accessor: `DataEntries[1].${name}.Total`,
    Cell: DollarCell
  },
  {
    Header: "NonUtil",
    accessor: `DataEntries[1].${name}.NonUtil`,
    Cell: DollarCell
  },
  {
    Header: () => (
      <>
        <FaWater /> Sewer
      </>
    ),
    accessor: `DataEntries[1].${name}.Sewer`,
    Cell: DollarCell
  },
  {
    Header: () => (
      <>
        <FaFireAlt /> Fire
      </>
    ),
    accessor: `DataEntries[1].${name}.Fire`,
    Cell: DollarCell
  },
  {
    Header: () => (
      <div>
        <FaTree /> Parks
      </div>
    ),
    accessor: `DataEntries[1].${name}.Parks`,
    Cell: DollarCell
  },
  {
    Header: () => (
      <div>
        <FaBook /> Library
      </div>
    ),
    accessor: `DataEntries[1].${name}.Library`,
    Cell: DollarCell
  },
  {
    Header: () => (
      <div>
        <FaShieldAlt /> Police
      </div>
    ),
    accessor: `DataEntries[1].${name}.Police`,
    Cell: DollarCell
  }
];

export function BasicTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Basic Info",
        columns: [
          {
            Header: "State",
            accessor: "State",
            width: 80
          },
          {
            Header: "County",
            accessor: "County",
            width: 200
          },
          {
            Header: "Jurisdiction",
            accessor: "Jurisdiction",
            className: "Jurisdiction",
            Cell: ({ cell }) => {
              return (
                <Link to={`Jurisdiction/${cell.value}`}>
                  {cell.value}
                  <div className="light-text">
                    {cell.row.original.County}, {cell.row.original.State}
                  </div>
                </Link>
              );
            },
            width: 200
          },
          {
            Header: "Updated",
            accessor: "DataEntries[1].Updated",
            Cell: DateCell
          }
        ]
      },
      {
        Header: "Single Family",
        columns: DetailColumns("SingleFamily")
      },
      {
        Header: "Multi Family",
        columns: DetailColumns("MultiFamily")
      },
      {
        Header: "Retail",
        columns: DetailColumns("Retail")
      },
      {
        Header: "Office",
        columns: DetailColumns("Office")
      },
      {
        Header: "Industrial",
        columns: DetailColumns("Industrial")
      }
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
