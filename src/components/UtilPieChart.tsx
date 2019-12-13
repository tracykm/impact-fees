import React, { useState } from "react";
import { DonutChart } from "./DonutChart";
import { UsedKeys } from "../utils/getUsedKeys";
import {
  JurisdictionData,
  PropertyType,
  TypesOfPlaces,
  UtilityDict
} from "../types";

export const UtilPieChart = ({
  usedKeys,
  DataEntries
}: {
  usedKeys: UsedKeys;
  DataEntries: JurisdictionData["DataEntries"];
}) => {
  const [propertyType, setPropertyType] = useState(
    "SingleFamily" as PropertyType
  );
  const data: {
    name: string;
    value: number;
    color: string;
    // @ts-ignore
  }[] = usedKeys.SingleFamily.filter(d => d !== "Total").map(
    // @ts-ignore
    name => ({
      name,
      // @ts-ignore
      value: DataEntries[0][propertyType][name],
      color: UtilityDict[name].color
    })
  );
  return (
    <div>
      <DonutChart data={data} />
      <select
        onChange={({ target }) => {
          setPropertyType(target.value as PropertyType);
        }}
      >
        {TypesOfPlaces.map(d => (
          <option value={d}>{d}</option>
        ))}
      </select>
    </div>
  );
};
