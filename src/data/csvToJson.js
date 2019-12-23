const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const file = "./src/data/raw/sample.csv";

function parseNum(obj, key) {
  if (!obj[key]) {
    return delete obj[key];
  }
  if (typeof obj[key] === "string") {
    if (obj[key].toLowerCase() === "n/a") {
      return delete obj[key];
    }
    var newNum = Number(obj[key].replace("$", "").replace(",", ""));
    if (newNum !== newNum) {
      // create a new field to store this extra non-numeric info
      obj[`${key}Notes`] = obj[key];
      return delete obj[key];
    } else {
      obj[key] = newNum;
    }
  }
}

function parseDate(obj, key) {
  if (!obj[key]) {
    return delete obj[key];
  }
  if (typeof obj[key] === "string") {
    if (obj[key].toLowerCase() === "n/a") {
      return delete obj[key];
    }
    var newDate = Number(new Date(obj[key]));
    if (newDate !== newDate) {
      // create a new field to store this extra non-date info
      obj[`${key}Notes`] = obj[key];
      return delete obj[key];
    } else {
      obj[key] = newDate;
    }
  }
}

const columnFuncs = {
  Total: parseNum,
  NonUtil: parseNum,
  Roads: parseNum,
  Water: parseNum,
  Sewer: parseNum,
  Drain: parseNum,
  Parks: parseNum,
  Library: parseNum,
  Fire: parseNum,
  Police: parseNum,
  GenGov: parseNum,
  Schools: parseNum,
  Other: parseNum
};

const { Transform } = require("stream");

const parseToJSON = new Transform({
  transform(chunk, encoding, callback) {
    const parsedData = parse(chunk.toString(), {
      // columns: header => {
      //   let num = 0;
      //   const headerGroups = [
      //     "",
      //     "SingleFamily",
      //     "MultiFamily",
      //     "Retail",
      //     "Office",
      //     "Industrial"
      //   ];
      //   return header.map((column, i) => {
      //     if (column.trim() === "Total") {
      //       num++;
      //     }
      //     return `${headerGroups[num]}.${column.trim()}`;
      //   });
      // },
      on_record: (record, opts) => {
        const newRecord = {};
        Object.keys(record).forEach(k => {
          const [group, col] = k.split(".");
          let val = record[k];
          if (!group) {
            if (val !== "") {
              newRecord[col] = val;
              if (columnFuncs[col]) {
                val = columnFuncs[col](newRecord, col);
              }
            }
          } else {
            if (val !== "") {
              newRecord[group] = newRecord[group] || {};
              newRecord[group][col] = val;
              if (columnFuncs[col]) {
                val = columnFuncs[col](newRecord[group], col);
              }
            }
          }
        });
        return newRecord;
      }
    });
    process.stdout.write(" . ");
    callback(null, JSON.stringify(parsedData, null, 2));
  }
});

const SRC_DIR_NAME = "./src/data/raw/";
const DEST_DIR_NAME = "./src/data/raw/";

// const filename = "sample.csv";
// fs.readdir(SRC_DIR_NAME, function(err, filenames) {
["sample.csv", "s2008.csv"].forEach(filename => {
  const [baseName, extension] = filename.split(".");
  if (extension === "csv") {
    console.log(filename);
    fs.createReadStream(SRC_DIR_NAME + filename)
      .pipe(parseToJSON)
      .pipe(fs.createWriteStream(DEST_DIR_NAME + baseName + ".json"))
      .on("finish", () => console.log(`${baseName} Done`));
  }
});
// });
