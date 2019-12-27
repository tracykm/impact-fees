import React, { useState } from "react";
import { STATES } from "../types";
import stateAverages from "../data/cleaned/stateAverages.json";
import { AllDetailColumns } from "./columns";
import { Table } from "./Table";
import { ButtonsOrDropdown } from "./ButtonsOrDropdown";

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
const yearOpts = data[0].DataEntries.map((d, i) => {
  return { value: i, name: new Date(d.Updated).getFullYear() };
});

export const AllStateAveragesPage = () => {
  const [stateSelected, changeState] = useState(0);
  const path = `DataEntries[${stateSelected}].`;
  return (
    <>
      <div>
        <ButtonsOrDropdown
          options={yearOpts}
          onChange={val => {
            changeState(Number(val));
          }}
        />
      </div>
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
