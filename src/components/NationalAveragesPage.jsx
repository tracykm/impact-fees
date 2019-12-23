import React from "react";
import { DetailPage } from "./DetailPage";
import { getAverages } from "../data/getAverages.js";
import { Link } from "react-router-dom";
import { STATES } from "../types";

export const NationalAveragesPage = () => {
  const { DataEntries, sampleSize } = getAverages(() => true);
  const myData = { DataEntries };
  return (
    <>
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
      {STATES.map(s => (
        <Link className="p-2" to={`/state/${s.short_name}`}>
          {s.name}{" "}
        </Link>
      ))}
    </>
  );
};
