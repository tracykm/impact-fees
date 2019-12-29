import React from "react";
import { Table } from "./Table";
import { AllDetailColumns } from "./columns";
import { DateCell } from "./Cell";
import { Link } from "react-router-dom";
import data from "../data/cleaned/nestedData.json";
import styled from "styled-components";

// to make Jurisdiction sticky but not detail 3rd row
const Wrapper = styled.div`
  td:nth-child(3),
  tr:nth-child(2) th:nth-child(3) {
    position: sticky;
    left: 0;
    background-color: #ffffff;
    z-index: 1;
  }
  tr:nth-child(2) th:nth-child(3) {
    background-color: #eaeaea;
  }
`;

const dataJS = Object.values(data);
const path = "DataEntries[0].";
export function OverallTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Basic Info",
        columns: [
          {
            Header: "State",
            accessor: "State",
            width: 50,
            Cell: ({ cell }) => {
              return <Link to={`state/${cell.value}`}>{cell.value}</Link>;
            }
          },
          {
            Header: "County",
            accessor: "County"
          },
          {
            Header: "Jurisdiction",
            accessor: "Jurisdiction",
            className: "jurisdiction",
            Cell: ({ cell }) => {
              return (
                <Link
                  to={`/state/${cell.row.original.State}/jurisdiction/${cell.value}`}
                >
                  {cell.value}
                  <div className="light-text">
                    {cell.row.original.County}, {cell.row.original.State}
                  </div>
                </Link>
              );
            }
          },
          {
            Header: "Date",
            accessor: `${path}Updated`,
            Cell: DateCell
          }
        ]
      },
      ...AllDetailColumns({ path })
    ],
    []
  );

  const data = React.useMemo(() => dataJS, []);

  return (
    <Wrapper>
      <Table columns={columns} data={data} hasPagination />
    </Wrapper>
  );
}
