import React from "react";
import { JurisdictionPage } from "./JurisdictionPage";
import { getAverages } from "../data/getAverages.js";

export const NationalAveragesPage = () => {
  const DataEntries = getAverages(() => true);
  const myData = { DataEntries, Jurisdiction: "Averages" };
  return <JurisdictionPage myData={myData} />;
};
