import {
  FaFireAlt,
  FaTree,
  FaWater,
  FaBook,
  FaShieldAlt,
  FaRoad,
  FaBuilding,
  FaSchool,
  FaWaveSquare,
  FaShower
} from "react-icons/fa";

export interface JurisdictionData {
  State: string;
  County: string;
  Jurisdiction: string;
  DataEntries: DataEntry[];
}
export type DataEntry = {
  Updated: number;
  SampleSize?: number;
  RecordedAt: string;
  SingleFamily: UtilityBreakDown;
  MultiFamily: UtilityBreakDown;
  Retail: UtilityBreakDown;
  Office: UtilityBreakDown;
  Industrial: UtilityBreakDown;
};
export type PropertyType =
  | "SingleFamily"
  | "MultiFamily"
  | "Retail"
  | "Office"
  | "Industrial";
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

export const PropertyDict: { [k in PropertyType]: { color: string } } = {
  SingleFamily: {
    color: "#a3ea83"
  },
  MultiFamily: {
    color: "#31c3a6"
  },
  Retail: {
    color: "#01a4ac"
  },
  Office: {
    color: "#36849d"
  },
  Industrial: {
    color: "#56d19d"
  }
};
// @ts-ignore
export const TypesOfPlaces: PropertyType[] = Object.keys(PropertyDict);

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
    Icon: FaRoad
  },
  GenGov: {
    color: "#a3ea83",
    Icon: FaBuilding
  },
  Schools: {
    color: "#7cde91",
    Icon: FaSchool
  },
  Sewer: {
    color: "#31c3a6",
    Icon: FaWaveSquare
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
    Icon: FaShower
  },
  Water: {
    color: "#36849d",
    Icon: FaWater
  },
  Police: {
    color: "#44748e",
    Icon: FaShieldAlt
  },
  Other: {
    color: "#56d19d",
    Icon: null
  }
};

// @ts-ignore
export const TypesOfUtilities: UtilityType[] = Object.keys(UtilityDict);
