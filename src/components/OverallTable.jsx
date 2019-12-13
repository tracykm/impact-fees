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
const path = "DataEntries[1].";
export function OverallTable() {
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
            className: "jurisdiction",
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
            width: 300
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
