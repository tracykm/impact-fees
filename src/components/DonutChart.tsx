import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const renderCustomizedLabel = ({ tooltipPayload, percent }) => {
  let percentStr = Math.round(percent * 100) + "% ";
  if (percent * 100 < 1) {
    percentStr = Math.round(percent * 1000) / 10 + "% ";
  }
  return percentStr + tooltipPayload[0].name;
};

export const DonutChart = ({
  data
}: {
  data: Array<{ name: string; value: number; color: string }>;
}) => {
  const width = 480;
  const height = 400;
  return (
    <PieChart className="piechart" width={width} height={height}>
      <Pie
        data={data}
        cx={width / 2}
        cy={height / 2}
        innerRadius={120}
        outerRadius={140}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        stroke={0}
        // @ts-ignore
        label={renderCustomizedLabel}
      >
        {// @ts-ignore
        data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};
