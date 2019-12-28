import React, { useState } from "react";
import { STATES } from "../types";
import stateAverages from "../data/cleaned/stateAverages.json";
import { AllDetailColumns } from "./columns";
import { Table } from "./Table";
import { ButtonsOrDropdown } from "./ButtonsOrDropdown";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip } from "recharts";
import { formatMoney } from "./Cell";

let data = [];

Object.keys(stateAverages).forEach(State => {
  if (stateAverages[State][0]) {
    data.push({
      DataEntries: stateAverages[State],
      State: STATES.find(d => d.short_name === State).name
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
  const path = `DataEntries[${yearSelected}].`;
  const longerPath = `${path}SingleFamily.Total`;
  return (
    <>
      <div>
        <ButtonsOrDropdown
          options={yearOpts}
          onChange={val => {
            changeYear(Number(val));
          }}
        />
      </div>

      <BarChart width={1200} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="State" tickFormatter={getShortStateName} />
        <YAxis tickFormatter={formatMoney} />
        <Tooltip
          formatter={(val, name) => [
            formatMoney(val),
            name.split(".")[1] + " " + name.split(".")[2]
          ]}
        />
        <Bar dataKey={longerPath} fill="#56d19d" />
      </BarChart>

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
    </>
  );
};
