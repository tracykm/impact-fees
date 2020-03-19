const countyCodesJSON = require("./raw/countyCodes.json");
// const nestedData = require("./cleaned/nestedData.json");
const { STATES } = require("../constants");

const needsRemap = [
  {
    "Summary Level": 162,
    "State Code (FIPS)": "04",
    "County Code (FIPS)": "000",
    "Area Name": "Mariciopa"
    // "Area Name": "Maricopa city"
  },
  {
    "Summary Level": "050",
    "State Code (FIPS)": "06",
    "County Code (FIPS)": "071",
    "Area Name": "San Bernadino County"
    // "Area Name": "San Bernardino County"
  },
  {
    "Summary Level": "050",
    "State Code (FIPS)": "08",
    "County Code (FIPS)": "097",
    "Area Name": "Pitken County"
    // "Area Name": "Pitkin County"
  },
  {
    "Summary Level": "050",
    "State Code (FIPS)": 12,
    "County Code (FIPS)": "086",
    "Area Name": "Dade"
    // "Area Name": "Miami-Dade County"
  },
  {
    "Summary Level": "050",
    "State Code (FIPS)": 22,
    "County Code (FIPS)": "033",
    "Area Name": "E Baton Rouge"
    // "Area Name": "East Baton Rouge Parish"
  },
  {
    "Summary Level": "050",
    "State Code (FIPS)": "06",
    "County Code (FIPS)": "071",
    "Area Name": "San Bernadino County"
    // "Area Name": "San Bernardino County"
  },
  {
    "Summary Level": "050",
    "State Code (FIPS)": 24,
    "County Code (FIPS)": "003",
    "Area Name": "Ann Arundel"
    // "Area Name": "Anne Arundel County"
  },
  {
    "Summary Level": "050",
    "State Code (FIPS)": 24,
    "County Code (FIPS)": "003",
    "Area Name": "Ann Arundel"
    // "Area Name": "Anne Arundel County"
  },
  {
    "Summary Level": "050",
    "State Code (FIPS)": 35,
    "County Code (FIPS)": "013",
    "Area Name": "Dona Ana"
    // "Area Name": "Doña Ana County"
  },
  {
    "Summary Level": "050",
    "State Code (FIPS)": 51,
    "County Code (FIPS)": 107,
    "Area Name": "Louden"
    // "Area Name": "Loudoun County"
  },
  {
    "Summary Level": "050",
    "State Code (FIPS)": 50,
    "County Code (FIPS)": "007",
    "Area Name": "Chittendon"
    // "Area Name": "Chittenden County"
  },
  {
    "Summary Level": "050",
    "State Code (FIPS)": 17,
    "County Code (FIPS)": "043",
    "Area Name": "DuPage/Kane"
    // "Area Name": "DuPage County"
  },
  {
    "Summary Level": "050",
    "State Code (FIPS)": 22,
    "County Code (FIPS)": 103,
    "Area Name": "St. Tammany"
    // "Area Name": "St. Tammany Parish"
  }
];

const countyCodes = [...countyCodesJSON, ...needsRemap];

function addFipsCodes(nestedData) {
  const usedCodes = {};
  Object.values(nestedData).forEach(d => {
    const state = STATES.find(s => s.short_name === d.State);

    const baseCountyName = d.County.toLowerCase()
      .replace("county", "")
      .replace(".", "")
      .trim();

    const item = countyCodes.find((code, i) => {
      if (!state) {
        return { usedCodes, nestedData };
      }
      if (state.fips !== String(code["State Code (FIPS)"])) {
        return false;
      }

      const codeBaseName = code["Area Name"]
        .toLowerCase()
        .replace("county", "")
        .replace(".", "")
        .trim();

      if (baseCountyName === codeBaseName) {
        return true;
      }

      return false;
    });
    if (item) {
      d.fips = item["State Code (FIPS)"] + item["County Code (FIPS)"];
      usedCodes[d.fips] = usedCodes[d.fips] || { jurisdictions: [] };
      usedCodes[d.fips].jurisdictions.push({
        Jurisdiction: d.Jurisdiction,
        County: d.County,
        State: d.State,
        fips: d.fips
      });
    } else {
      // console.log(d.County, d.State, state.fips);
    }
  });
  return { usedCodes, nestedData };
}

module.exports = { addFipsCodes };
