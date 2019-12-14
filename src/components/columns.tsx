import React from "react";
import { DollarCell } from "./Cell";
import { UtilityDict } from "../types";

const ColHeader = ({ name }: { name: string }) => {
  const Icon = UtilityDict[name].Icon;
  if (!Icon) return <div>{name}</div>;
  return (
    <>
      <Icon /> {name}
    </>
  );
};

export const DetailColumns = ({
  name,
  path = "",
  usedKeys
}: {
  name: string;
  path?: string;
  usedKeys?: string[];
}) => {
  const cols = Object.keys(UtilityDict).map(k => ({
    Header: <ColHeader name={k} />,
    accessor: `${path}${name}.${k}`,
    Cell: DollarCell,
    width: 100
  }));

  if (usedKeys) {
    return cols.filter(c =>
      usedKeys.includes(c.accessor.split(".").pop() as string)
    );
  }

  return cols;
};
