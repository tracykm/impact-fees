import React, { useState } from "react";
import {
  LineChart,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { formatDate, formatMoney } from "./Cell";
import { JurisdictionData, UtilityType } from "../types";
import { getUsedKeys, UsedKeys } from "../utils/getUsedKeys";

const TypesOfPlaces = [
  "SingleFamily",
  "MultiFamily",
  "Retail",
  "Office",
  "Industrial"
];

export const HistoryLineChart = ({
  DataEntries,
  usedKeys
}: {
  DataEntries: JurisdictionData["DataEntries"];
  usedKeys: UsedKeys;
}) => {
  const [utility, setUtility] = useState("Total" as UtilityType);
  const opts = Object.values(usedKeys)
    .flat()
    .slice(0, 10);

  const data = DataEntries.map(d => ({
    SingleFamily: d.SingleFamily[utility],
    MultiFamily: d.MultiFamily[utility],
    Retail: d.Retail[utility],
    Office: d.Office[utility],
    Industrial: d.Industrial[utility],
    Updated: d.Updated
  }));
  return (
    <>
      <select
        onChange={({ target }) => {
          setUtility(target.value as UtilityType);
        }}
      >
        {opts.map(d => (
          <option value={d}>{d}</option>
        ))}
      </select>
      <LineChart
        width={900}
        height={400}
        data={data}
        margin={{
          top: 5,
          left: 100,
          bottom: 5
        }}
      >
        <XAxis
          tickFormatter={val => {
            return formatDate(new Date(val));
          }}
          dataKey="Updated"
          type="number"
          domain={["auto", "auto"]}
        />
        <YAxis />
        <Tooltip formatter={formatMoney} />
        {TypesOfPlaces.map(utilityName => (
          <Line type="monotone" dataKey={utilityName} stroke="#8884d8" />
        ))}
      </LineChart>
    </>
  );
};
