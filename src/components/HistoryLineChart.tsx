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
import { JurisdictionData, UtilityType, TypesOfPlaces } from "../types";
import { UsedKeys } from "../utils/getUsedKeys";
import { ButtonOptions } from "./ButtonOptions";

export const HistoryLineChart = ({
  DataEntries,
  usedKeys
}: {
  DataEntries: JurisdictionData["DataEntries"];
  usedKeys: UsedKeys;
}) => {
  const [utility, setUtility] = useState("Total" as UtilityType);
  const opts: string[] = Object.keys(
    Object.values(usedKeys)
      .flat()
      // @ts-ignore
      .reduce((acc, k) => {
        // @ts-ignore
        acc[k] = k; // remove duplicates
        return acc;
      }, {})
  );
  // debugger;

  const data = DataEntries.map(d => ({
    SingleFamily: d.SingleFamily[utility],
    MultiFamily: d.MultiFamily[utility],
    Retail: d.Retail[utility],
    Office: d.Office[utility],
    Industrial: d.Industrial[utility],
    Updated: d.Updated
  }));
  return (
    <div style={{ width: "900px" }}>
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
        {TypesOfPlaces.map(propertyType => (
          <Line type="monotone" dataKey={propertyType} stroke="#8884d8" />
        ))}
      </LineChart>
      <div className="text-center">
        <ButtonOptions
          //@ts-ignore
          onChange={setUtility}
          value={utility as string}
          options={opts.map(d => ({ name: d, value: d }))}
        />
      </div>
    </div>
  );
};
