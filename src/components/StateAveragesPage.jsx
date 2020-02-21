import React from "react";
import { MapChart } from "./MapChart";
import { DetailPage } from "./DetailPage";
import { useParams, Link } from "react-router-dom";
import stateAverages from "../data/cleaned/stateAverages.json";
import { STATES } from "../types";

export const StateAveragesPage = () => {
  const { state } = useParams();

  const DataEntries = stateAverages[state];

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

  const sampleSizes = DataEntries.map(s => s.SampleSize);
  const min = Math.min(...sampleSizes);
  const max = Math.max(...sampleSizes);

  const jurisdictions = Object.keys(
    DataEntries.reduce((acc, d) => {
      d.SampleJurisdictions.forEach(j => {
        acc[j] = true;
      });
      return acc;
    }, {})
  );

  const fullState = STATES.find(s => s.short_name === state);

  return (
    <>
      <DetailPage
        data={myData}
        headerText={
          <div className="text-left">
            <h1>{fullState.name}</h1>
            <div style={{ opacity: 0.5, marginTop: "-.5em" }}>
              Sample size: {min === max ? min : `${min}-${max}`}
            </div>
          </div>
        }
      />
      {jurisdictions.length} Jurisdictions:
      {jurisdictions.sort().map(j => (
        <Link className="p-2" to={`/state/${state}/jurisdiction/${j}`}>
          {j}{" "}
        </Link>
      ))}
      <MapChart stateShortName={state} stateFips={fullState.fips} />
    </>
  );
};
