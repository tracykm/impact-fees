// const data = require("../data/cleaned/nestedData.json");
const { TypesOfUtilities, TypesOfPlaces } = require('../constants')

const objectMap = (obj, fn) => {
  if (!obj) return
  const newObj = {}
  Object.keys(obj).forEach((k) => {
    let value = obj[k]
    value = fn(value)
    if (value) {
      newObj[k] = value
    }
  })
  return newObj
}

function getAverages(filterFunc, data) {
  const averagesForUtils = Object.values(data).reduce((acc, d) => {
    if (!filterFunc(d)) return acc
    d.DataEntries.forEach((entry) => {
      if (!entry.Updated) return
      const year = String(new Date(entry.Updated).getFullYear())
      acc[year] = acc[year] || {}
      TypesOfPlaces.forEach((property) => {
        acc[year][property] = acc[year][property] || {}
        TypesOfUtilities.forEach((utilityName) => {
          acc[year][property][utilityName] = acc[year][property][
            utilityName
          ] || {
            total: 0,
            num: 0,
            jurisdictions: [],
          }
          if (entry[property] && entry[property][utilityName]) {
            acc[year][property][utilityName].total +=
              entry[property][utilityName]
            acc[year][property][utilityName].num += 1
            acc[year][property][utilityName].jurisdictions.push(d.Jurisdiction)
          }
        })
      })
    })
    return acc
  }, {})

  const DataEntries = []
  const sampleSize = []

  Object.keys(averagesForUtils).map((year) => {
    if (averagesForUtils[year].SingleFamily.Total.num < 0) {
      return
    }
    const sampleSizeForYear = {}
    TypesOfUtilities.forEach((util) => {
      sampleSizeForYear[util] = {
        year,
        num: averagesForUtils[year].SingleFamily[util].num,
        jurisdictions: averagesForUtils[year].SingleFamily[util].jurisdictions,
      }
    })
    sampleSize.push(sampleSizeForYear)
    DataEntries.push({
      Updated: Number(new Date(`June ${year}`)),
      SampleSize: averagesForUtils[year].SingleFamily.Total.num,
      SampleJurisdictions:
        averagesForUtils[year].SingleFamily.Total.jurisdictions,
      SingleFamily: objectMap(
        averagesForUtils[year].SingleFamily,
        (d) => d.total / d.num,
      ),
      MultiFamily: objectMap(
        averagesForUtils[year].MultiFamily,
        (d) => d.total / d.num,
      ),
      Retail: objectMap(averagesForUtils[year].Retail, (d) => d.total / d.num),
      Office: objectMap(averagesForUtils[year].Office, (d) => d.total / d.num),
      Industrial: objectMap(
        averagesForUtils[year].Industrial,
        (d) => d.total / d.num,
      ),
    })
  })
  return {
    DataEntries: DataEntries.sort((d1, d2) => d2.Updated - d1.Updated),
    sampleSize,
  }
}

module.exports = { getAverages }
