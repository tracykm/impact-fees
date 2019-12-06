const s2019 = require('./raw/s2019');
const s2015 = require('./raw/s2015');
const s2012 = require('./raw/s2012');
const s2011 = require('./raw/s2011');
const s2010 = require('./raw/s2010');
const s2007 = require('./raw/s2007');
const sample = require('./raw/sample');

const {cleanData} = require('./cleanData');
const {nestData} = require('./nestData');
var fs = require('fs');

const allSets = {
  // sample,
  s2007,
  s2010,
  s2011,
  s2012,
  s2015,
  s2019,
};

const cleanedArr = [];

Object.keys(allSets).forEach(name => {
  const jsonData = allSets[name];
  const cleanedData = cleanData(jsonData, name);
  cleanedArr.push(cleanedData);
  fs.writeFile(
    `src/data/cleaned/${name}.json`,
    JSON.stringify(cleanedData, null, 2),
    'utf8',
    () => {}
  );
});

fs.writeFile(
  `src/data/cleaned/nestedData.json`,
  JSON.stringify(nestData(cleanedArr), null, 2),
  'utf8',
  () => {}
);
