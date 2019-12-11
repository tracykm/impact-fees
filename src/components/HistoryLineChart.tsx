import React from "react";
import {
  LineChart,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { formatDate, formatMoney } from "./Cell";
import { JurisdictionData, Utility } from "../types";

const TypesOfPlaces = [
  "SingleFamily",
  "MultiFamily",
  "Retail",
  "Office",
  "Industrial"
];

export const HistoryLineChart = ({
  DataEntries,
  utility
}: {
  DataEntries: JurisdictionData["DataEntries"];
  utility: Utility;
}) => {
  const data = DataEntries.map(d => ({
    SingleFamily: d.SingleFamily[utility],
    MultiFamily: d.MultiFamily[utility],
    Retail: d.Retail[utility],
    Office: d.Office[utility],
    Industrial: d.Industrial[utility],
    Updated: d.Updated
  }));
  return (
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
  );
};
