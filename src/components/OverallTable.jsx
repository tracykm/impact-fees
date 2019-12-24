import React from "react";
import { Table } from "./Table";
import { DetailColumns } from "./columns";
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
    background-color: #25282e;
    z-index: 1;
  }
  tr:nth-child(2) th:nth-child(3) {
    background-color: #1b1d20;
  }
`;

const dataJS = Object.values(data);
// debugger;
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
            Header: "Updated",
            accessor: `${path}Updated`,
            Cell: DateCell
          }
        ]
      },
      {
        Header: "Single Family",
        columns: DetailColumns({ name: "SingleFamily", path })
      },
      {
        Header: "Multi Family",
        columns: DetailColumns({ name: "MultiFamily", path })
      },
      {
        Header: "Retail",
        columns: DetailColumns({ name: "Retail", path })
      },
      {
        Header: "Office",
        columns: DetailColumns({ name: "Office", path })
      },
      {
        Header: "Industrial",
        columns: DetailColumns({ name: "Industrial", path })
      }
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
