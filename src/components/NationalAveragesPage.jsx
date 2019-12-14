import React from "react";
import { DetailPage } from "./DetailPage";
import { getAverages } from "../data/getAverages.js";

export const NationalAveragesPage = () => {
  const { DataEntries, sampleSize } = getAverages(() => true);
  const myData = { DataEntries };
  return (
    <DetailPage
      data={myData}
      headerText={
        <div>
          <h1>National Averages</h1>
          <div style={{ opacity: 0.5, marginTop: "-.5em" }}>
            Sample size: {sampleSize[1].Total.num}
          </div>
        </div>
      }
    />
  );
};
