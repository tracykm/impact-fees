import React, { useState } from "react";
import { STATES } from "../types";
import stateAverages from "../data/cleaned/stateAverages.json";
import { AllDetailColumns } from "./columns";
import { Table } from "./Table";
import { ButtonsOrDropdown } from "./ButtonsOrDropdown";
import { ButtonOptions } from "./ButtonOptions";
import { BarChart, XAxis, YAxis, Bar, Tooltip } from "recharts";
import { formatMoney } from "./Cell";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { TypesOfPlaces } from "../types";

const Wrapper = styled.div`
  td:nth-child(1),
  tr:nth-child(2) th:nth-child(1) {
    position: sticky;
    left: 0;
    background-color: #25282e;
    z-index: 1;
  }
  tr:nth-child(2) th:nth-child(1) {
    background-color: #1b1d20;
  }
  margin: 1rem;
  width: 100%;
  overflow-x: auto;
`;

let data = [];

Object.keys(stateAverages).forEach(State => {
  if (stateAverages[State][0]) {
    data.push({
      DataEntries: stateAverages[State],
      State: STATES.find(d => d.short_name === State).name,
      StateShortName: State
    });
  }
  return undefined;
});

data = data.sort((d1, d2) => {
  return (
    d2.DataEntries[0].SingleFamily.Total - d1.DataEntries[0].SingleFamily.Total
  );
});

const yearOpts = data[0].DataEntries.map((d, i) => {
  return { value: i, name: new Date(d.Updated).getFullYear() };
});

function getShortStateName(val) {
  return STATES.find(d => d.name === val).short_name;
}

export const AllStateAveragesPage = () => {
  const [yearSelected, changeYear] = useState(0);
  const [placeSelected, changePlace] = useState("SingleFamily");
  const path = `DataEntries[${yearSelected}].`;
  const longerPath = `${path}${placeSelected}.Total`;
  const leftOffStates = [];
  const myData = data.filter(d => {
    if (
      d.DataEntries[yearSelected] &&
      d.DataEntries[yearSelected].SampleSize > 5
    ) {
      return true;
    } else {
      leftOffStates.push({
        State: d.State,
        StateShortName: d.StateShortName,
        SampleSize:
          d.DataEntries[yearSelected] && d.DataEntries[yearSelected].SampleSize
      });
    }
  });
  return (
    <>
      <div style={{ margin: "auto", width: "1200px" }} className="text-center">
        <div className="text-left">
          <h1>State Averages</h1>
          <ButtonsOrDropdown
            className="mb-3"
            options={yearOpts}
            onChange={val => {
              changeYear(Number(val));
            }}
          />
        </div>
        <BarChart width={1200} height={250} data={myData}>
          <XAxis dataKey="State" tickFormatter={getShortStateName} />
          <YAxis tickFormatter={formatMoney} domain={[0, d => 40000]} />
          <Tooltip
            formatter={(val, name) => [
              formatMoney(val),
              name.split(".")[1] + " " + name.split(".")[2]
            ]}
          />
          <Bar dataKey={longerPath} fill="#56d19d" />
        </BarChart>
        <ButtonOptions
          className="mb-3"
          value={placeSelected}
          options={TypesOfPlaces.map(d => ({ name: d, value: d }))}
          onChange={changePlace}
        />
      </div>
      <Wrapper>
        <Table
          columns={[
            {
              Header: "State",
              accessor: "State",
              Cell: ({ cell, row }) => {
                return (
                  <Link to={`state/${row.original.StateShortName}`}>
                    {cell.value}
                  </Link>
                );
              }
            },
            {
              Header: " ",
              accessor: `${path}SampleSize`,
              width: 50
            },
            ...AllDetailColumns({ path })
          ]}
          data={myData}
        />

        <div>
          Sample size too small:{" "}
          {leftOffStates.map(s => (
            <Link className="p-2" to={`/state/${s.StateShortName}`}>
              {s.State} ({s.SampleSize || 0}){" "}
            </Link>
          ))}
        </div>
      </Wrapper>
    </>
  );
};
