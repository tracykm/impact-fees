import React from "react";
import { DetailPage } from "./DetailPage";
import nationalAverages from "../data/cleaned/nationalAverages.json";
import { Link } from "react-router-dom";
import { STATES } from "../types";
import stateAverages from "../data/cleaned/stateAverages.json";

const data = [];

Object.keys(stateAverages).forEach(State => {
  if (stateAverages[State][0]) {
    data.push({
      ...stateAverages[State][0],
      State: STATES.find(d => d.short_name === State).name
    });
  }
});

export const AllStateAveragesPage = () => {
  const DataEntries = data;
  const myData = { DataEntries };
  return (
    <>
      <DetailPage
        data={myData}
        headerText={
          <div className="text-left">
            <h1>State Averages</h1>
            <div style={{ opacity: 0.5, marginTop: "-.5em" }}>
              Sample size: {DataEntries[1].SampleSize}
            </div>
          </div>
        }
      />
      {STATES.map(s => {
        const samples =
          stateAverages[s.short_name][0] &&
          stateAverages[s.short_name][0].SampleSize;
        if (!samples) {
          return <span className="p-2">{s.name} </span>;
        }
      })}
    </>
  );
};
