const countyCodes = require("./raw/countyCodes.json");
// const nestedData = require("./cleaned/nestedData.json");
const { STATES } = require("../constants");

function addFipsCodes(nestedData) {
  Object.values(nestedData).forEach(d => {
    const state = STATES.find(s => s.short_name === d.State);
    const baseCountyName = d.County.toLowerCase()
      .replace("county", "")
      .trim();

    const item = countyCodes.find((code, i) => {
      if (state.fips !== code["State Code (FIPS)"]) {
        return false;
      }
      if ((code["Area Name"] || "").toLowerCase() === d.County.toLowerCase()) {
        return true;
      }
      if (
        baseCountyName ===
        code["Area Name"]
          .toLowerCase()
          .replace("county", "")
          .trim()
      ) {
        return true;
      }

      return false;
    });
    if (item) {
      d.fips = item["State Code (FIPS)"] + item["County Code (FIPS)"];
    }
  });
  return nestedData;
}

module.exports = { addFipsCodes };
