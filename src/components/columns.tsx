import React from "react";
import {
  FaFireAlt,
  FaTree,
  FaWater,
  FaBook,
  FaShieldAlt
} from "react-icons/fa";
import { DollarCell, DateCell } from "./Cell";

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
      Header: () => (
        <>
          <FaWater /> Sewer
        </>
      ),
      accessor: `${path}${name}.Sewer`,
      Cell: DollarCell
    },
    {
      Header: () => (
        <>
          <FaFireAlt /> Fire
        </>
      ),
      accessor: `${path}${name}.Fire`,
      Cell: DollarCell
    },
    {
      Header: () => (
        <div>
          <FaTree /> Parks
        </div>
      ),
      accessor: `${path}${name}.Parks`,
      Cell: DollarCell
    },
    {
      Header: () => (
        <div>
          <FaBook /> Library
        </div>
      ),
      accessor: `${path}${name}.Library`,
      Cell: DollarCell
    },
    {
      Header: () => (
        <div>
          <FaShieldAlt /> Police
        </div>
      ),
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
