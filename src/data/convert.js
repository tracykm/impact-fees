const s2019 = require ('./raw/s2019');
const s2015 = require ('./raw/s2015');
const s2012 = require ('./raw/s2012');
const s2011 = require ('./raw/s2011');
const s2010 = require ('./raw/s2010');
const s2007 = require ('./raw/s2007');
const sample = require ('./raw/sample');

const { cleanData } = require ('./cleanData');
var fs = require('fs');

const allSets = {
    // sample,
    s2019,
    s2015,
    s2012,
    s2011,
    s2010,
    s2007,
}

Object.keys(allSets).forEach((name) => {
    const jsonData = allSets[name]
    fs.writeFile(`src/data/cleaned/${name}.json`, JSON.stringify (cleanData (jsonData, name), null, 2), 'utf8', () => {});
})
