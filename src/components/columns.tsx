import React from "react";
import {
  FaFireAlt,
  FaTree,
  FaWater,
  FaBook,
  FaShieldAlt
} from "react-icons/fa";
import { DollarCell, DateCell } from "./Cell";
import { UtilityDict } from "../types";

const ColHeader = ({ name }: { name: string }) => {
  // @ts-ignore
  const Icon = UtilityDict[name].Icon;
  if (!Icon) return null;
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
  const cols = [
    {
      Header: "Total",
      accessor: `${path}${name}.Total`,
      Cell: DollarCell
    },
    {
      Header: "NonUtil",
      accessor: `${path}${name}.NonUtil`,
      Cell: DollarCell
    },
    {
      Header: <ColHeader name="Sewer" />,
      accessor: `${path}${name}.Sewer`,
      Cell: DollarCell
    },
    {
      Header: <ColHeader name="Fire" />,
      accessor: `${path}${name}.Fire`,
      Cell: DollarCell
    },
    {
      Header: <ColHeader name="Parks" />,
      accessor: `${path}${name}.Parks`,
      Cell: DollarCell
    },
    {
      Header: <ColHeader name="Library" />,
      accessor: `${path}${name}.Library`,
      Cell: DollarCell
    },
    {
      Header: <ColHeader name="Police" />,
      accessor: `${path}${name}.Police`,
      Cell: DollarCell
    }
  ];
  if (usedKeys) {
    return cols.filter(c =>
      usedKeys.includes(c.accessor.split(".").pop() as string)
    );
  }

  return cols;
};
