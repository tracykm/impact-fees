import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import nestedData from "../data/cleaned/nestedData.json";
import { JurisdictionTable } from "./JurisdictionTable";
import { HistoryLineChart } from "./HistoryLineChart";
import { UtilPieChart } from "./UtilPieChart";
import { getUsedKeys } from "../utils/getUsedKeys";
import { JurisdictionData } from "../types";
const Wrapper = styled.div`
  margin: 1rem;
  width: 100%;
  overflow-x: auto;
`;

const ChartsWrapper = styled.div`
  width: 1250px;
  margin: auto;
`;

export const JurisdictionPage = () => {
  const { name } = useParams();
  // @ts-ignore
  const data: JurisdictionData = nestedData[name as keyof typeof nestedData];
  const usedKeys = getUsedKeys(data.DataEntries);
  return (
    <>
      <ChartsWrapper>
        <h1>{name}</h1>
        <UtilPieChart DataEntries={data.DataEntries} usedKeys={usedKeys} />
        <HistoryLineChart
          // @ts-ignore
          DataEntries={data.DataEntries}
          usedKeys={usedKeys}
        />
      </ChartsWrapper>
      <div className="m-4" />

      <Wrapper>
        <JurisdictionTable
          //@ts-ignore
          usedKeys={usedKeys}
          //@ts-ignore
          data={data}
        />
      </Wrapper>
    </>
  );
};
