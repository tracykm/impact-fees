import React, { useState, useMemo } from "react";
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
import { TypesOfPlaces, UtilityDict, PropertyDict } from "../types";
import MapStates from "./MapStates";

const Wrapper = styled.div`
  td:nth-child(1),
  tr:nth-child(2) th:nth-child(1) {
    position: sticky;
    left: 0;
    background-color: #f7f7f7;
    z-index: 1;
  }
  tr:nth-child(2) th:nth-child(1) {
    background-color: #eaeaea;
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
const placeOpts = ["All", ...TypesOfPlaces].map(d => ({ name: d, value: d }));
const utilOpts = Object.keys(UtilityDict).map(d => ({
  name: d,
  value: d,
  icon: UtilityDict[d].Icon
}));

function getShortStateName(val) {
  return STATES.find(d => d.name === val).short_name;
}

export const AllStateAveragesPage = () => {
  const [yearSelected, changeYear] = useState(0);
  const [selectedPlace, changePlace] = useState("SingleFamily");
  const [selectedUtil, changeUtil] = useState("Total");
  const path = `DataEntries[${yearSelected}].`;
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

  const AllBars = useMemo(
    () =>
      Object.keys(PropertyDict).map(place => (
        <Bar
          key={`${path}${place}.${selectedUtil}`}
          dataKey={`${path}${place}.${selectedUtil}`}
          fill={PropertyDict[place].color}
        />
      )),
    [selectedUtil]
  );

  const columns = useMemo(
    () => [
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
    ],
    [path]
  );

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
          <YAxis tickFormatter={formatMoney} />
          <Tooltip
            formatter={(val, name) => [
              formatMoney(val),
              name.split(".")[1] + " " + name.split(".")[2]
            ]}
          />
          {selectedPlace === "All" ? (
            AllBars
          ) : (
            <Bar
              dataKey={`${path}${selectedPlace}.${selectedUtil}`}
              fill={PropertyDict[selectedPlace].color}
            />
          )}
        </BarChart>
        <ButtonOptions
          className="mb-3"
          value={selectedPlace}
          options={placeOpts}
          onChange={changePlace}
        />
        <br />
        <ButtonOptions
          className="mb-3"
          value={selectedUtil}
          options={utilOpts}
          onChange={changeUtil}
        />
      </div>
      <Wrapper>
        <Table columns={columns} data={myData} />
      </Wrapper>
      <div>
        Sample size too small:{" "}
        {leftOffStates.map(s => (
          <Link
            key={s.StateShortName}
            className="p-2"
            to={`/state/${s.StateShortName}`}
          >
            {s.State} ({s.SampleSize || 0}){" "}
          </Link>
        ))}
      </div>
      <div style={{ maxWidth: 900, margin: "auto" }}>
        <MapStates />
      </div>
    </>
  );
};
