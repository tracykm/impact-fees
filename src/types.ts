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
  FaShower,
} from 'react-icons/fa'

export interface JurisdictionData {
  State: string
  County: string
  Jurisdiction: string
  DataEntries: DataEntry[]
}
export type DataEntry = {
  Updated: number
  SampleSize?: number
  RecordedAt: string
  SingleFamily: UtilityBreakDown
  MultiFamily: UtilityBreakDown
  Retail: UtilityBreakDown
  Office: UtilityBreakDown
  Industrial: UtilityBreakDown
}
export type PropertyType =
  | 'SingleFamily'
  | 'MultiFamily'
  | 'Retail'
  | 'Office'
  | 'Industrial'
export type UtilityType = keyof UtilityBreakDown

export interface UtilityBreakDown {
  Total?: number
  NonUtil?: number
  Roads?: number
  Water?: number
  Sewer?: number
  Drain?: number
  Parks?: number
  Library?: number
  Fire?: number
  Police?: number
  GenGov?: number
  Schools?: number
  Other?: number
}

export const PropertyDict: { [k in PropertyType]: { color: string } } = {
  SingleFamily: {
    color: '#db6d4f',
  },
  MultiFamily: {
    color: '#ca5865',
  },
  Retail: {
    color: '#ab4e74',
  },
  Office: {
    color: '#844a7a',
  },
  Industrial: {
    color: '#614879',
  },
}
// @ts-ignore
export const TypesOfPlaces: PropertyType[] = Object.keys(PropertyDict)

export const UtilityDict = {
  Total: {
    color: '#d0aa26',
    Icon: null,
  },
  NonUtil: {
    color: '#d99a2d',
    Icon: null,
  },
  Fire: {
    color: '#de8a37',
    Icon: FaFireAlt,
  },
  Roads: {
    color: '#de7b43',
    Icon: FaRoad,
  },
  GenGov: {
    color: '#db6d4f',
    Icon: FaBuilding,
  },
  Schools: {
    color: '#d4615a',
    Icon: FaSchool,
  },
  Sewer: {
    color: '#ca5865',
    Icon: FaWaveSquare,
  },
  Library: {
    color: '#bc526d',
    Icon: FaBook,
  },
  Parks: {
    color: '#ab4e74',
    Icon: FaTree,
  },
  Drain: {
    color: '#984b79',
    Icon: FaShower,
  },
  Water: {
    color: '#844a7a',
    Icon: FaWater,
  },
  Police: {
    color: '#6f4879',
    Icon: FaShieldAlt,
  },
  Other: {
    color: '#614879',
    Icon: null,
  },
}

// @ts-ignore
export const TypesOfUtilities: UtilityType[] = Object.keys(UtilityDict)

export const STATES = [
  { name: 'Alabama', short_name: 'AL', fips: '01' },
  { name: 'Alaska', short_name: 'AK', fips: '02' },
  { name: 'Arizona', short_name: 'AZ', fips: '04' },
  { name: 'Arkansas', short_name: 'AR', fips: '05' },
  { name: 'California', short_name: 'CA', fips: '06' },
  { name: 'Colorado', short_name: 'CO', fips: '08' },
  { name: 'Connecticut', short_name: 'CT', fips: '09' },
  { name: 'Delaware', short_name: 'DE', fips: '10' },
  { name: 'Florida', short_name: 'FL', fips: '12' },
  { name: 'Georgia', short_name: 'GA', fips: '13' },
  { name: 'Hawaii', short_name: 'HI', fips: '15' },
  { name: 'Idaho', short_name: 'ID', fips: '16' },
  { name: 'Illinois', short_name: 'IL', fips: '17' },
  { name: 'Indiana', short_name: 'IN', fips: '18' },
  { name: 'Iowa', short_name: 'IA', fips: '19' },
  { name: 'Kansas', short_name: 'KS', fips: '20' },
  { name: 'Kentucky', short_name: 'KY', fips: '21' },
  { name: 'Louisiana', short_name: 'LA', fips: '22' },
  { name: 'Maine', short_name: 'ME', fips: '23' },
  { name: 'Maryland', short_name: 'MD', fips: '24' },
  { name: 'Massachusetts', short_name: 'MA', fips: '25' },
  { name: 'Michigan', short_name: 'MI', fips: '26' },
  { name: 'Minnesota', short_name: 'MN', fips: '27' },
  { name: 'Mississippi', short_name: 'MS', fips: '28' },
  { name: 'Missouri', short_name: 'MO', fips: '29' },
  { name: 'Montana', short_name: 'MT', fips: '30' },
  { name: 'Nebraska', short_name: 'NE', fips: '31' },
  { name: 'Nevada', short_name: 'NV', fips: '32' },
  { name: 'New Hampshire', short_name: 'NH', fips: '33' },
  { name: 'New Jersey', short_name: 'NJ', fips: '34' },
  { name: 'New Mexico', short_name: 'NM', fips: '35' },
  { name: 'New York', short_name: 'NY', fips: '36' },
  { name: 'North Carolina', short_name: 'NC', fips: '37' },
  { name: 'North Dakota', short_name: 'ND', fips: '38' },
  { name: 'Ohio', short_name: 'OH', fips: '39' },
  { name: 'Oklahoma', short_name: 'OK', fips: '40' },
  { name: 'Oregon', short_name: 'OR', fips: '41' },
  { name: 'Pennsylvania', short_name: 'PA', fips: '42' },
  { name: 'Rhode Island', short_name: 'RI', fips: '44' },
  { name: 'South Carolina', short_name: 'SC', fips: '45' },
  { name: 'South Dakota', short_name: 'SD', fips: '46' },
  { name: 'Tennessee', short_name: 'TN', fips: '47' },
  { name: 'Texas', short_name: 'TX', fips: '48' },
  { name: 'Utah', short_name: 'UT', fips: '49' },
  { name: 'Vermont', short_name: 'VT', fips: '50' },
  { name: 'Virginia', short_name: 'VA', fips: '51' },
  { name: 'Washington', short_name: 'WA', fips: '53' },
  { name: 'West Virginia', short_name: 'WV', fips: '54' },
  { name: 'Wisconsin', short_name: 'WI', fips: '55' },
  { name: 'Wyoming', short_name: 'WY', fips: '56' },
]
