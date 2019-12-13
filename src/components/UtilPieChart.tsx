import React, { PureComponent } from "react";
import { PieChart, Pie, Sector } from "recharts";
import { DonutChart } from "./DonutChart";
import { UsedKeys } from "../utils/getUsedKeys";
import { JurisdictionData } from "../types";

export const UtilPieChart = ({
  usedKeys,
  DataEntries
}: {
  usedKeys: UsedKeys;
  DataEntries: JurisdictionData["DataEntries"];
}) => {
  // @ts-ignore
  const data: { name: string; value: number }[] = usedKeys.SingleFamily.filter(
    d => d !== "Total"
  ).map(
    // @ts-ignore
    name => ({
      name,
      value: DataEntries[0].SingleFamily[name]
    })
  );
  return <DonutChart data={data} />;
};
