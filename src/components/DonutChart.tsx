import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";

const renderCustomizedLabel = ({
  // @ts-ignore
  tooltipPayload
}) => {
  return tooltipPayload[0].name;
};

export class DonutChart extends PureComponent<{
  data: Array<{ name: string; value: number; color: string }>;
}> {
  state = {
    activeIndex: 0
  };
  // @ts-ignore
  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    const { data } = this.props;
    return (
      <PieChart
        className="piechart"
        width={800}
        height={400}
        onMouseEnter={this.onPieEnter}
      >
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
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
