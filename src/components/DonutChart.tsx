import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";

const renderCustomizedLabel = ({ tooltipPayload, percent }) => {
  let percentStr = Math.round(percent * 100) + "% ";
  if (percent * 100 < 1) {
    percentStr = Math.round(percent * 1000) / 10 + "% ";
  }
  return percentStr + tooltipPayload[0].name;
};

export class DonutChart extends PureComponent<{
  data: Array<{ name: string; value: number; color: string }>;
}> {
  state = {
    activeIndex: 0
  };
  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    const { data } = this.props;
    const width = 480;
    const height = 400;
    return (
      <PieChart
        className="piechart"
        width={width}
        height={height}
        onMouseEnter={this.onPieEnter}
      >
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
  }
}
// data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
