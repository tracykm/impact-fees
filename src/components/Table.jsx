import React, { useState } from "react";
//@ts-ignore
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useBlockLayout
} from "react-table";
import TableStyles from "./TableStyles";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const SearchBar = ({ columns }) => {
  const [columnFilter, setColumnFilter] = useState(2);
  const currentCol = columns[0].columns[columnFilter];
  return (
    <div className="input-group my-3 pt-5" style={{ width: "300px" }}>
      <select
        className="custom-select"
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
        className="input-group-append form-control"
        onChange={e => {
          currentCol.setFilter(e.target.value);
        }}
        placeholder="search..."
      />
    </div>
  );
};

export function Table({ columns, data, hasPagination }) {
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
    <TableStyles>
      {hasPagination ? <SearchBar {...{ columns: args.columns }} /> : ""}
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
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaAngleDown size={30} />
                      ) : (
                        <FaAngleUp size={30} />
                      )
                    ) : (
                      ""
                    )}
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
      {hasPagination ? (
        <div className="pagination">
          <div className="btn-group">
            <button
              className="btn btn-outline-secondary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>{" "}
            <button
              className="btn btn-outline-secondary"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>{" "}
            <button
              className="btn btn-outline-secondary"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {">"}
            </button>{" "}
            <button
              className="btn btn-outline-secondary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
          </div>
          <span className="px-2">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span className="px-2">| Go to page: </span>
          <span className="px-2">
            <input
              className="form-control"
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
            className="selectpicker"
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
      ) : (
        ""
      )}
    </TableStyles>
  );
}
