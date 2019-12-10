import React from "react";
import { DetailColumns } from "./columns";
import { Table } from "./Table";
import { DollarCell, DateCell } from "./Cell";
import { JurisdictionData } from "../types";

export const JurisdictionTable = ({ data }: { data: JurisdictionData }) => {
  const usedKeys = {
    SingleFamily: ["Total", "Library"],
    MultiFamily: ["Police"]
  };
  const columns = [
    {
      Header: "Updated",
      accessor: "Updated",
      Cell: DateCell
    },
    {
      Header: "Single Family",
      columns: DetailColumns({
        name: "SingleFamily",
        usedKeys: usedKeys.SingleFamily
      })
    },
    {
      Header: "Multi Family",
      columns: DetailColumns({
        name: "MultiFamily",
        usedKeys: usedKeys.MultiFamily
      })
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
  //@ts-ignore
  return <Table columns={columns} data={data.DataEntries} />;
};
