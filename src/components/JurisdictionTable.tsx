import React from "react";
import { DetailColumns } from "./columns";
import { Table } from "./Table";
import { DollarCell, DateCell } from "./Cell";
import { JurisdictionData } from "../types";
import { getUsedKeys } from "../utils/getUsedKeys";

export const JurisdictionTable = ({ data }: { data: JurisdictionData }) => {
  const usedKeys = getUsedKeys([data.DataEntries[1]]);
  const columns = [
    {
      Header: "Updated",
      accessor: "Updated",
      Cell: DateCell
    },
    {
      Header: "Recorded At",
      accessor: "RecordedAt"
    },
    {
      Header: "Single Family",
      columns: DetailColumns({
        name: "SingleFamily",
        usedKeys: usedKeys.SingleFamily || []
      })
    },
    {
      Header: "Multi Family",
      columns: DetailColumns({
        name: "MultiFamily",
        usedKeys: usedKeys.MultiFamily || []
      })
    },
    {
      Header: "Retail",
      columns: DetailColumns({
        name: "Retail",
        usedKeys: usedKeys.Retail || []
      })
    },
    {
      Header: "Office",
      columns: DetailColumns({
        name: "Office",
        usedKeys: usedKeys.Office || []
      })
    },
    {
      Header: "Industrial",
      columns: DetailColumns({
        name: "Industrial",
        usedKeys: usedKeys.Industrial || []
      })
    }
  ];

  //@ts-ignore
  return <Table columns={columns} data={data.DataEntries} />;
};
