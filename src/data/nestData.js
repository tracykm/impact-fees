function nestData(listOfYears) {
  const newObj = {};
  Object.keys(listOfYears).forEach(yearName => {
    const yearData = listOfYears[yearName];
    yearData.forEach(dataPoint => {
      const key = dataPoint.State + dataPoint.Jurisdiction;
      const { Jurisdiction, County, State, ...otherDataPoint } = dataPoint;
      if (Jurisdiction && Jurisdiction !== "Jurisdiction") {
        newObj[key] = newObj[key] || {
          Jurisdiction,
          County,
          State,
          DataEntries: []
        };
        otherDataPoint.RecordedAt = yearName;
        if (otherDataPoint.Updated) {
          newObj[key].DataEntries.push(otherDataPoint);
        }
      }
    });
  });

  Object.keys(listOfYears).forEach(yearName => {
    const yearData = listOfYears[yearName];
    yearData.forEach(dataPoint => {
      const key = dataPoint.State + dataPoint.Jurisdiction;
      if (newObj[key]) {
        newObj[key].DataEntries = newObj[key].DataEntries.sort(
          (d1, d2) => d2.Updated - d1.Updated
        );
      }
    });
  });

  return newObj;
}

exports.nestData = nestData;
