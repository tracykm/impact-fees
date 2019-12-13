import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import nestedData from "../data/cleaned/nestedData.json";
import { JurisdictionTable } from "./JurisdictionTable";
import { HistoryLineChart } from "./HistoryLineChart";
import { DetailPage } from "./DetailPage";
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

export const JurisdictionPage = ({ myData }: { myData?: JurisdictionData }) => {
  const { name } = useParams();
  // @ts-ignore
  const data: JurisdictionData = myData
    ? myData
    : nestedData[name as keyof typeof nestedData];

  return <DetailPage data={data} headerText={name} />;
};
