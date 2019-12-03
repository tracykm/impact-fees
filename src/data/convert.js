const survey2019 = require ('./raw/2019');
const { cleanData } = require ('./cleanData');
var fs = require('fs');

var cleaned = cleanData (survey2019);

fs.writeFile('src/data/cleaned/2019.json', JSON.stringify (cleaned, null, 2), 'utf8', () => {});