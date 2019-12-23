import { getAverages } from "./getAverages";

it("getAverages", () => {
  const nestedData = {
    ARLowell: {
      State: "AR",
      County: "Benton",
      Jurisdiction: "Lowell",
      DataEntries: [
        {
          Updated: 1200000000000,
          RecordedAt: "s2011",
          SingleFamily: {
            Total: 2,
            NonUtil: 10
          }
        },
        {
          Updated: 70000000000,
          RecordedAt: "s2012",
          SingleFamily: {
            Total: 10,
            NonUtil: 10
          },
          MultiFamily: {
            Water: 10
          }
        }
      ]
    },
    AROrange: {
      State: "AR",
      County: "Benton",
      Jurisdiction: "Orange",
      DataEntries: [
        {
          Updated: 1200000000000,
          RecordedAt: "s2011",
          SingleFamily: {
            Total: 10,
            NonUtil: 10
          }
        }
      ]
    }
  };
  expect(getAverages(() => true, nestedData).DataEntries).toEqual([
    {
      Updated: 1212296400000,
      SingleFamily: {
        Total: 6,
        NonUtil: 10
      },
      MultiFamily: {},
      Industrial: {},
      Office: {},
      Retail: {},
      SampleSize: 2,
      SampleJurisdictions: ["Lowell", "Orange"]
    },
    {
      Updated: 76222800000,
      SingleFamily: {
        Total: 10,
        NonUtil: 10
      },
      MultiFamily: {
        Water: 10
      },
      Industrial: {},
      Office: {},
      Retail: {},
      SampleSize: 1,
      SampleJurisdictions: ["Lowell"]
    }
  ]);
});
