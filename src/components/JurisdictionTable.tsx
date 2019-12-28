import React from "react";
import { AllDetailColumns } from "./columns";
import { Table } from "./Table";
import { JurisdictionData } from "../types";
import { UsedKeys } from "../utils/getUsedKeys";
import styled from "styled-components";

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
      Header: "Date",
      accessor: "Updated",
      width: 90,
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
    ...AllDetailColumns({ usedKeys })
  ];

  return (
    <Wrapper>
      <Table columns={columns} data={data.DataEntries} hasPagination={false} />
    </Wrapper>
  );
};
