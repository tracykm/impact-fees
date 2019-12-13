import React from "react";
import { DetailPage } from "./DetailPage";
import { useParams } from "react-router-dom";
import { getAverages } from "../data/getAverages.js";

export const StateAveragesPage = () => {
  const { state } = useParams();

  const DataEntries = getAverages(d => d.State === state);

  if (!DataEntries.length) return <div>Not enough data</div>;
  const myData = { DataEntries, Jurisdiction: "Averages" };

  return <DetailPage data={myData} headerText={state} />;
};
