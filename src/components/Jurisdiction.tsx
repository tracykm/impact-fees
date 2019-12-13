import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import nestedData from "../data/cleaned/nestedData.json";
import { JurisdictionTable } from "./JurisdictionTable";
import { HistoryLineChart } from "./HistoryLineChart";
import { UtilPieChart } from "./UtilPieChart";
import { getUsedKeys, UsedKeys } from "../utils/getUsedKeys";
import { JurisdictionData } from "../types";
const Wrapper = styled.div`
  margin: 1rem;
`;

export const Jurisdiction = () => {
  const { name } = useParams();
  // @ts-ignore
  const data: JurisdictionData = nestedData[name as keyof typeof nestedData];
  const usedKeys = getUsedKeys(data.DataEntries);
  return (
    <Wrapper>
      <h1>{name}</h1>

      <JurisdictionTable
        //@ts-ignore
        usedKeys={usedKeys}
        //@ts-ignore
        data={data}
      />

      <HistoryLineChart
        // @ts-ignore
        DataEntries={data.DataEntries}
        usedKeys={usedKeys}
      />

      <UtilPieChart DataEntries={data.DataEntries} usedKeys={usedKeys} />
    </Wrapper>
  );
};
