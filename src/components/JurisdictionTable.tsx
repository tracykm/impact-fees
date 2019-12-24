import React from "react";
import { DetailColumns } from "./columns";
import { Table } from "./Table";
import { DateCell } from "./Cell";
import { JurisdictionData } from "../types";
import { UsedKeys } from "../utils/getUsedKeys";
import styled from "styled-components";

// to make Jurisdiction sticky but not detail 3rd row
const Wrapper = styled.div`
  td:nth-child(1),
  tr:nth-child(2) th:nth-child(1) {
    position: sticky;
    left: 0;
    background-color: #25282e;
    z-index: 1;
  }
  tr:nth-child(2) th:nth-child(1) {
    background-color: #1b1d20;
  }
`;

export const JurisdictionTable = ({
  data,
  usedKeys
}: {
  data: JurisdictionData;
  usedKeys: UsedKeys;
}) => {
  const columns = [
    // @ts-ignore
    ...(data.DataEntries[0].State
      ? [
          {
            Header: "State",
            accessor: "State"
            // width: 70
          }
        ]
      : []),
    {
      Header: "Updated",
      accessor: "Updated",
      width: 80,
      Cell: ({ cell }) => new Date(cell.value).getFullYear()
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
    <Wrapper>
      <Table columns={columns} data={data.DataEntries} hasPagination={false} />
    </Wrapper>
  );
};
