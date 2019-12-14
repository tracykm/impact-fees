import React from "react";
import { DetailColumns } from "./columns";
import { Table } from "./Table";
import { DateCell } from "./Cell";
import { JurisdictionData } from "../types";
import { UsedKeys } from "../utils/getUsedKeys";

export const JurisdictionTable = ({
  data,
  usedKeys
}: {
  data: JurisdictionData;
  usedKeys: UsedKeys;
}) => {
  const columns = [
    {
      Header: "Updated",
      accessor: "Updated",
      Cell: DateCell
    },
    ...(data.DataEntries[0].SampleSize
      ? [
          {
            Header: "Sample Size",
            accessor: "SampleSize",
            width: 70
          }
        ]
      : []),
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

  return (
    <Table columns={columns} data={data.DataEntries} hasPagination={false} />
  );
};
