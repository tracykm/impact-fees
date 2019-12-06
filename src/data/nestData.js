function nestData(listOfYears) {
  const newObj = {};
  listOfYears.forEach(yearData => {
    yearData.forEach(dataPoint => {
      const {Jurisdiction, County, State, ...otherDataPoint} = dataPoint;
      newObj[dataPoint.Jurisdiction] = newObj[dataPoint.Jurisdiction] || {
        Jurisdiction,
        County,
        State,
        DataEntries: [],
      };
      newObj[dataPoint.Jurisdiction].DataEntries.push(otherDataPoint);
    });
  });

  listOfYears.forEach(yearData => {
    yearData.forEach(dataPoint => {
      newObj[dataPoint.Jurisdiction].DataEntries = newObj[
        dataPoint.Jurisdiction
      ].DataEntries.sort((d1, d2) => d2.Updated - d1.Updated);
    });
  });

  return newObj;
}

exports.nestData = nestData;
