import React, { useState } from "react";
import { DonutChart } from "./DonutChart";
import { UsedKeys } from "../utils/getUsedKeys";
import { JurisdictionData, PropertyType, TypesOfPlaces } from "../types";

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
  // @ts-ignore
  const data: { name: string; value: number }[] = usedKeys.SingleFamily.filter(
    d => d !== "Total"
  ).map(
    // @ts-ignore
    name => ({
      name,
      // @ts-ignore
      value: DataEntries[0][propertyType][name]
    })
  );
  return (
    <div>
      <select
        onChange={({ target }) => {
          setPropertyType(target.value as PropertyType);
        }}
      >
        {TypesOfPlaces.map(d => (
          <option value={d}>{d}</option>
        ))}
      </select>
      <DonutChart data={data} />
    </div>
  );
};
