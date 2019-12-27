import React from "react";
import { DollarCell } from "./Cell";
import { UtilityDict } from "../types";
import { UsedKeys } from "../utils/getUsedKeys";

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

const allKeys = Object.keys(UtilityDict);

export const AllDetailColumns = ({
  usedKeys = {
    SingleFamily: allKeys,
    MultiFamily: allKeys,
    Retail: allKeys,
    Office: allKeys,
    Industrial: allKeys
  } as UsedKeys,
  path = ""
}) => {
  return [
    {
      Header: "Single Family",
      columns: DetailColumns({
        name: "SingleFamily",
        usedKeys: usedKeys.SingleFamily || [],
        path
      })
    },
    {
      Header: "Multi Family",
      columns: DetailColumns({
        name: "MultiFamily",
        usedKeys: usedKeys.MultiFamily || [],
        path
      })
    },
    {
      Header: "Retail",
      columns: DetailColumns({
        name: "Retail",
        usedKeys: usedKeys.Retail || [],
        path
      })
    },
    {
      Header: "Office",
      columns: DetailColumns({
        name: "Office",
        usedKeys: usedKeys.Office || [],
        path
      })
    },
    {
      Header: "Industrial",
      columns: DetailColumns({
        name: "Industrial",
        usedKeys: usedKeys.Industrial || [],
        path
      })
    }
  ];
};
