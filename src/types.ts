export interface JurisdictionData {
  State: string;
  County: string;
  Jurisdiction: string;
  DataEntries: Array<{
    Updated?: number;
    RecordedAt?: number;
    SingleFamily: Details;
    MultiFamily?: Details;
    Retail?: Details;
    Office?: Details;
    Industrial?: Details;
  }>;
}

export interface Details {
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
