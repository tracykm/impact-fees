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
    color: "#db6d4f"
  },
  MultiFamily: {
    color: "#ca5865"
  },
  Retail: {
    color: "#ab4e74"
  },
  Office: {
    color: "#844a7a"
  },
  Industrial: {
    color: "#614879"
  }
};
// @ts-ignore
export const TypesOfPlaces: PropertyType[] = Object.keys(PropertyDict);

export const UtilityDict = {
  Total: {
    color: "#d0aa26",
    Icon: null
  },
  NonUtil: {
    color: "#d99a2d",
    Icon: null
  },
  Fire: {
    color: "#de8a37",
    Icon: FaFireAlt
  },
  Roads: {
    color: "#de7b43",
    Icon: FaRoad
  },
  GenGov: {
    color: "#db6d4f",
    Icon: FaBuilding
  },
  Schools: {
    color: "#d4615a",
    Icon: FaSchool
  },
  Sewer: {
    color: "#ca5865",
    Icon: FaWaveSquare
  },
  Library: {
    color: "#bc526d",
    Icon: FaBook
  },
  Parks: {
    color: "#ab4e74",
    Icon: FaTree
  },
  Drain: {
    color: "#984b79",
    Icon: FaShower
  },
  Water: {
    color: "#844a7a",
    Icon: FaWater
  },
  Police: {
    color: "#6f4879",
    Icon: FaShieldAlt
  },
  Other: {
    color: "#614879",
    Icon: null
  }
};

// @ts-ignore
export const TypesOfUtilities: UtilityType[] = Object.keys(UtilityDict);

export const STATES = [
  { name: "Alabama", short_name: "AL" },
  { name: "Alaska", short_name: "AK" },
  { name: "Arizona", short_name: "AZ" },
  { name: "Arkansas", short_name: "AR" },
  { name: "California", short_name: "CA" },
  { name: "Colorado", short_name: "CO" },
  { name: "Connecticut", short_name: "CT" },
  { name: "Delaware", short_name: "DE" },
  { name: "Florida", short_name: "FL" },
  { name: "Georgia", short_name: "GA" },
  { name: "Hawaii", short_name: "HI" },
  { name: "Idaho", short_name: "ID" },
  { name: "Illinois", short_name: "IL" },
  { name: "Indiana", short_name: "IN" },
  { name: "Iowa", short_name: "IA" },
  { name: "Kansas", short_name: "KS" },
  { name: "Kentucky", short_name: "KY" },
  { name: "Louisiana", short_name: "LA" },
  { name: "Maine", short_name: "ME" },
  { name: "Maryland", short_name: "MD" },
  { name: "Massachusetts", short_name: "MA" },
  { name: "Michigan", short_name: "MI" },
  { name: "Minnesota", short_name: "MN" },
  { name: "Mississippi", short_name: "MS" },
  { name: "Missouri", short_name: "MO" },
  { name: "Montana", short_name: "MT" },
  { name: "Nebraska", short_name: "NE" },
  { name: "Nevada", short_name: "NV" },
  { name: "New Hampshire", short_name: "NH" },
  { name: "New Jersey", short_name: "NJ" },
  { name: "New Mexico", short_name: "NM" },
  { name: "New York", short_name: "NY" },
  { name: "North Carolina", short_name: "NC" },
  { name: "North Dakota", short_name: "ND" },
  { name: "Ohio", short_name: "OH" },
  { name: "Oklahoma", short_name: "OK" },
  { name: "Oregon", short_name: "OR" },
  { name: "Pennsylvania", short_name: "PA" },
  { name: "Rhode Island", short_name: "RI" },
  { name: "South Carolina", short_name: "SC" },
  { name: "South Dakota", short_name: "SD" },
  { name: "Tennessee", short_name: "TN" },
  { name: "Texas", short_name: "TX" },
  { name: "Utah", short_name: "UT" },
  { name: "Vermont", short_name: "VT" },
  { name: "Virginia", short_name: "VA" },
  { name: "Washington", short_name: "WA" },
  { name: "West Virginia", short_name: "WV" },
  { name: "Wisconsin", short_name: "WI" },
  { name: "Wyoming", short_name: "WY" }
];
