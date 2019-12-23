import React from "react";
import { DetailPage } from "./DetailPage";
import nationalAverages from "../data/cleaned/nationalAverages.json";
import { Link } from "react-router-dom";
import { STATES } from "../types";

export const NationalAveragesPage = () => {
  const DataEntries = nationalAverages;
  const myData = { DataEntries };
  debugger;
  return (
    <>
      <DetailPage
        data={myData}
        headerText={
          <div>
            <h1>National Averages</h1>
            <div style={{ opacity: 0.5, marginTop: "-.5em" }}>
              Sample size: {DataEntries[1].SampleSize}
            </div>
          </div>
        }
      />
      {STATES.map(s => (
        <Link className="p-2" to={`/state/${s.short_name}`}>
          {s.name}{" "}
        </Link>
      ))}
    </>
  );
};
