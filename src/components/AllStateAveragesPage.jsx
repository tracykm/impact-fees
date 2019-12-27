import React from "react";
import { STATES } from "../types";
import stateAverages from "../data/cleaned/stateAverages.json";
import { AllDetailColumns } from "./columns";
import { Table } from "./Table";

const data = [];

Object.keys(stateAverages).forEach(State => {
  if (stateAverages[State][0]) {
    data.push({
      DataEntries: stateAverages[State],
      State: STATES.find(d => d.short_name === State).name
    });
  }
  return undefined;
});

export const AllStateAveragesPage = () => {
  const path = `DataEntries[0].`;
  return (
    <>
      <Table
        columns={[
          {
            Header: "State",
            accessor: "State"
          },
          ...AllDetailColumns({ path })
        ]}
        data={data}
      />
      {STATES.map(s => {
        const samples =
          stateAverages[s.short_name][0] &&
          stateAverages[s.short_name][0].SampleSize;
        if (!samples) {
          return <span className="p-2">{s.name} </span>;
        }
        return undefined;
      })}
    </>
  );
};
