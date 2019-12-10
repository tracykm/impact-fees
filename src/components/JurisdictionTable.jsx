import React from "react";
import { DetailColumns } from "./columns";
import { Table } from "./Table";
import { DollarCell, DateCell } from "./Cell";

export const JurisdictionTable = ({ data }) => {
  const columns = [
    {
      Header: "Updated",
      accessor: "Updated",
      Cell: DateCell
    },
    {
      Header: "Single Family",
      columns: DetailColumns({ name: "SingleFamily" })
    },
    {
      Header: "Multi Family",
      columns: DetailColumns({ name: "MultiFamily" })
    },
    {
      Header: "Retail",
      columns: DetailColumns({ name: "Retail" })
    },
    {
      Header: "Office",
      columns: DetailColumns({ name: "Office" })
    },
    {
      Header: "Industrial",
      columns: DetailColumns({ name: "Industrial" })
    }
  ];

  return <Table columns={columns} data={data.DataEntries} />;
};
