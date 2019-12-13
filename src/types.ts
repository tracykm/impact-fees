import {
  FaFireAlt,
  FaTree,
  FaWater,
  FaBook,
  FaShieldAlt
} from "react-icons/fa";

export interface JurisdictionData {
  State: string;
  County: string;
  Jurisdiction: string;
  DataEntries: DataEntry[];
}
export type DataEntry = {
  Updated?: number;
  RecordedAt?: string;
  SingleFamily: UtilityBreakDown;
  MultiFamily: UtilityBreakDown;
  Retail: UtilityBreakDown;
  Office: UtilityBreakDown;
  Industrial: UtilityBreakDown;
};
export type PropertyType = keyof DataEntry;
export type UtilityType = keyof UtilityBreakDown;

export interface UtilityBreakDown {
  Total?: number;
  NonUtil?: number;
  Roads?: number;
  Water?: number;
  Sewer?: number;
  Drain?: number;
  Parks?: number;
  Library?: number;
  Fire?: number;
  Police?: number;
  GenGov?: number;
  Schools?: number;
  Other?: number;
}

export const TypesOfPlaces: PropertyType[] = [
  "SingleFamily",
  "MultiFamily",
  "Retail",
  "Office",
  "Industrial"
];

export const UtilityDict = {
  Total: {
    color: "black",
    Icon: null
  },
  NonUtil: {
    color: "black",
    Icon: null
  },
  Roads: {
    color: "black",
    Icon: null
  },
  Water: {
    color: "black",
    Icon: null
  },
  Drain: {
    color: "black",
    Icon: null
  },
  GenGov: {
    color: "black",
    Icon: null
  },
  Schools: {
    color: "black",
    Icon: null
  },
  Other: {
    color: "black",
    Icon: null
  },
  Fire: {
    color: "red",
    Icon: FaFireAlt
  },
  Sewer: {
    color: "blue",
    Icon: FaWater
  },
  Library: {
    color: "blue",
    Icon: FaBook
  },
  Police: {
    color: "blue",
    Icon: FaShieldAlt
  },
  Parks: {
    color: "green",
    Icon: FaTree
  }
};

// @ts-ignore
export const TypesOfUtilities: UtilityType[] = Object.keys(UtilityDict);
