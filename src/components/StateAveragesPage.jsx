import React from "react";
import { DetailPage } from "./DetailPage";
import { useParams, Link } from "react-router-dom";
import stateAverages from "../data/cleaned/stateAverages.json";

export const StateAveragesPage = () => {
  const { state } = useParams();

  const DataEntries = stateAverages[state];
  debugger;

  if (!DataEntries[0] || !DataEntries[0].SampleSize)
    return (
      <div
        style={{
          fontSize: "1.5em",
          textAlign: "center",
          margin: "2em"
        }}
      >
        Not enough data
      </div>
    );
  const myData = { DataEntries, Jurisdiction: "Averages" };

  return (
    <>
      <DetailPage
        data={myData}
        headerText={
          <>
            <h1>{state}</h1>
            <div style={{ opacity: 0.5, marginTop: "-.5em" }}>
              Sample size: {DataEntries[0].SampleSize}
            </div>
          </>
        }
      />
      {/* Jurisdictions:
      {SampleSize[0].Total.jurisdictions.map(j => (
        <Link className="p-2" to={`/state/${state}/jurisdiction/${j}`}>
          {j}{" "}
        </Link>
      ))} */}
    </>
  );
};
