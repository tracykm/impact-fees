import React, { useState } from "react";
import { LineChart, Tooltip, Line, XAxis, YAxis } from "recharts";
import { formatDate, formatMoney } from "./Cell";
import { JurisdictionData, UtilityType, TypesOfPlaces } from "../types";
import { UsedKeys } from "../utils/getUsedKeys";
import { Dropdown } from "./Dropdown";

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
    <div className="d-inline-block">
      <LineChart
        width={600}
        height={400}
        data={data}
        margin={{
          bottom: 10
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
        <YAxis tickFormatter={formatMoney} />
        <Tooltip formatter={formatMoney} />
        {TypesOfPlaces.map(propertyType => (
          <Line
            type="monotone"
            key={propertyType}
            dataKey={propertyType}
            stroke="#3e745c"
          />
        ))}
      </LineChart>
      <div className="text-center">
        <Dropdown
          //@ts-ignore
          onChange={setUtility}
          value={utility as string}
          options={opts.map(d => ({ name: d, value: d }))}
        />
      </div>
    </div>
  );
};
