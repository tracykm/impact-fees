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
    color: "fcbfae",
    Icon: null
  },
  Roads: {
    color: "#565154",
    Icon: null
  },
  Water: {
    color: "#268191",
    Icon: null
  },
  Drain: {
    color: "#c1f7dc",
    Icon: null
  },
  GenGov: {
    color: "#af5c63",
    Icon: null
  },
  Schools: {
    color: "#f2535b",
    Icon: null
  },
  Other: {
    color: "#eeebd3",
    Icon: null
  },
  Fire: {
    color: "#b32c33",
    Icon: FaFireAlt
  },
  Sewer: {
    color: "#c1f7dc",
    Icon: FaWater
  },
  Library: {
    color: "#565154",
    Icon: FaBook
  },
  Police: {
    color: "#012f40",
    Icon: FaShieldAlt
  },
  Parks: {
    color: "#012f40",
    Icon: FaTree
  }
};

// @ts-ignore
export const TypesOfUtilities: UtilityType[] = Object.keys(UtilityDict);
