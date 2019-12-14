import React from "react";
import { DetailPage } from "./DetailPage";
import { useParams, Link } from "react-router-dom";
import { getAverages } from "../data/getAverages.js";

export const StateAveragesPage = () => {
  const { state } = useParams();

  const { DataEntries, sampleSize } = getAverages(d => d.State === state);

  if (!sampleSize[0] || !sampleSize[0].Total.num)
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
            <div style={{ fontSize: ".5em", opacity: 0.5, marginTop: "-.5em" }}>
              Sample size: {sampleSize[0].Total.num}
            </div>
          </>
        }
      />
      Jurisdictions:
      {sampleSize[0].Total.jurisdictions.map(j => (
        <Link className="p-2" to={`/state/${state}/jurisdiction/${j}`}>
          {j}{" "}
        </Link>
      ))}
    </>
  );
};
