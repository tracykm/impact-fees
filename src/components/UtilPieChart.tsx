import React, { useState } from "react";
import { DonutChart } from "./DonutChart";
import { UsedKeys } from "../utils/getUsedKeys";
import {
  JurisdictionData,
  PropertyType,
  TypesOfPlaces,
  UtilityDict
} from "../types";
import { ButtonsOrDropdown } from "./ButtonsOrDropdown";

export const UtilPieChart = ({
  usedKeys,
  DataEntries
}: {
  usedKeys: UsedKeys;
  DataEntries: JurisdictionData["DataEntries"];
}) => {
  const yearsUsed = DataEntries.map((d, i) => ({
    name: String(new Date(d.Updated).getFullYear()),
    value: i
  }));
  const [propertyType, setPropertyType] = useState(
    "SingleFamily" as PropertyType
  );
  const [yearIdx, setYear] = useState(0);
  // @ts-ignore
  const data: {
    name: string;
    value: number;
    color: string;
    // @ts-ignore
  }[] = usedKeys.SingleFamily.filter(
    d => d !== "Total" && !!UtilityDict[d] // filter out things like TotalNotes
  ).map(
    // @ts-ignore
    name => ({
      name,
      // @ts-ignore
      value: DataEntries[yearIdx][propertyType][name],
      color: UtilityDict[name].color
    })
  );
  return (
    <div className="d-inline-block mr-5 text-center">
      <DonutChart data={data} />
      <ButtonsOrDropdown
        onChange={setYear}
        value={yearIdx}
        options={yearsUsed}
      />
      <br />
      <ButtonsOrDropdown
        onChange={setPropertyType}
        value={propertyType}
        options={TypesOfPlaces.map(d => ({ name: d, value: d }))}
      />
    </div>
  );
};
