const s2019 = require("./raw/s2019");
const s2015 = require("./raw/s2015");
const s2012 = require("./raw/s2012");
const s2011 = require("./raw/s2011");
const s2010 = require("./raw/s2010");
const s2009 = require("./raw/s2009");
const s2008 = require("./raw/s2008");
const s2007 = require("./raw/s2007");
const s2006 = require("./raw/s2006");
const s2005 = require("./raw/s2005");
const s2003 = require("./raw/s2003");
// const sample = require("./raw/sample");

const { cleanData } = require("./cleanData");
const { nestData } = require("./nestData");
const { addFipsCodes } = require("./addFipsCodes");
const { getAverages } = require("./getAverages");
const { STATES } = require("../constants");
var fs = require("fs");

s2003.forEach(d => (d.Updated = Number(new Date("June 2003"))));

const allSets = {
  // sample
  s2003,
  s2005,
  s2006,
  s2007,
  s2008,
  s2009,
  s2010,
  s2011,
  s2012,
  s2015,
  s2019
};

const cleanedJS = {};

Object.keys(allSets).forEach(name => {
  const jsonData = allSets[name];
  const cleanedData = cleanData(jsonData, name);
  cleanedJS[name] = cleanedData;
  fs.writeFile(
    `src/data/cleaned/${name}.json`,
    JSON.stringify(cleanedData, null, 2),
    "utf8",
    () => {}
  );
});

const { usedCodes, nestedData } = addFipsCodes(nestData(cleanedJS));

fs.writeFile(
  `src/data/cleaned/usedFipsCodes.json`,
  JSON.stringify(usedCodes, null, 2),
  "utf8",
  () => {}
);

fs.writeFile(
  `src/data/cleaned/nestedData.json`,
  JSON.stringify(nestedData, null, 2),
  "utf8",
  () => {}
);

fs.writeFile(
  `src/data/cleaned/nationalAverages.json`,
  JSON.stringify(getAverages(d => true, nestedData).DataEntries, null, 2),
  "utf8",
  () => {}
);

const allStates = {};
STATES.forEach(({ short_name }) => {
  allStates[short_name] = getAverages(
    d => d.State === short_name,
    nestedData
  ).DataEntries;
});

fs.writeFile(
  `src/data/cleaned/stateAverages.json`,
  JSON.stringify(allStates, null, 2),
  "utf8",
  () => {}
);
