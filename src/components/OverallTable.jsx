import React from "react";
import { Table } from "./Table";
import { DetailColumns } from "./columns";
import { DollarCell, DateCell } from "./Cell";
import { Link } from "react-router-dom";
import data from "../data/cleaned/nestedData.json";
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

  return <Table columns={columns} data={data} hasPagination />;
}
