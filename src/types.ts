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
    color: "#565154",
    Icon: null
  },
  NonUtil: {
    color: "#ccc",
    Icon: null
  },
  Fire: {
    color: "#fafa6e",
    Icon: FaFireAlt
  },
  Roads: {
    color: "#cdf377",
    Icon: null
  },
  GenGov: {
    color: "#a3ea83",
    Icon: null
  },
  Schools: {
    color: "#7cde91",
    Icon: null
  },
  Other: {
    color: "#56d19d",
    Icon: null
  },
  Sewer: {
    color: "#31c3a6",
    Icon: FaWater
  },
  Library: {
    color: "#09b4ac",
    Icon: FaBook
  },
  Parks: {
    color: "#01a4ac",
    Icon: FaTree
  },
  Drain: {
    color: "#2094a7",
    Icon: null
  },
  Water: {
    color: "#36849d",
    Icon: null
  },
  Police: {
    color: "#44748e",
    Icon: FaShieldAlt
  }
};

// @ts-ignore
export const TypesOfUtilities: UtilityType[] = Object.keys(UtilityDict);
