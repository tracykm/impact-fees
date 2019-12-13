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
    color: "#fa9a6e",
    Icon: FaFireAlt
  },
  Roads: {
    color: "#dc995b",
    Icon: null
  },
  GenGov: {
    color: "#bd9750",
    Icon: null
  },
  Schools: {
    color: "#9f934c",
    Icon: null
  },
  Other: {
    color: "#828e4e",
    Icon: null
  },
  Sewer: {
    color: "#688652",
    Icon: FaWater
  },
  Library: {
    color: "#517e58",
    Icon: FaBook
  },
  Parks: {
    color: "#3e745c",
    Icon: FaTree
  },
  Drain: {
    color: "#31695e",
    Icon: null
  },
  Water: {
    color: "#2a5e5d",
    Icon: null
  },
  Police: {
    color: "#2a5358",
    Icon: FaShieldAlt
  }
};

// @ts-ignore
export const TypesOfUtilities: UtilityType[] = Object.keys(UtilityDict);
