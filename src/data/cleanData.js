function parseNum (obj, key) {
  if (!obj[key]) {
    return delete obj[key];
  }
  if (typeof obj[key] === 'string') {
    if (obj[key].toLowerCase () === 'n/a') {
      return delete obj[key];
    }
    var newNum = Number (obj[key].replace ('$', '').replace (',', ''));
    if (newNum !== newNum) {
      // create a new field to store this extra non-numeric info
      obj[`${key}Notes`] = obj[key];
      return delete obj[key];
    } else {
      obj[key] = newNum;
    }
  }
}

function parseDate (obj, key) {
  if (!obj[key]) {
    return delete obj[key];
  }
  if (typeof obj[key] === 'string') {
    if (obj[key].toLowerCase () === 'n/a') {
      return delete obj[key];
    }
    var newDate = Number (new Date (obj[key]));
    if (newDate !== newDate) {
      // create a new field to store this extra non-date info
      obj[`${key}Notes`] = obj[key];
      return delete obj[key];
    } else {
      obj[key] = newDate;
    }
  }
}

function cleanData (data, year) {
  return data
    .map (d => {
      const newObj = {
        State: d.State,
        County: d.County,
        Jurisdiction: d.Jurisdiction,
        Updated: d.Updated,
      };
      parseDate (newObj, 'Updated');
      let catts = [
        'SingleFamily',
        'MultiFamily',
        'Retail',
        'Office',
        'Industrial',
      ]
      if(year === 's2019') {
          catts = ['SingleFamily']
      }
      catts.forEach ((cat, i) => {
        let suffix = `__${i}`;
        if (i === 0) {
          suffix = '';
        }
        newObj[cat] = {
          Total: d[`Total${suffix}`],
          NonUtil: d[`NonUtil${suffix}`] ||  d[`Non-Util${suffix}`],
          Roads: d[`Roads${suffix}`],
          Water: d[`Water${suffix}`],
          Sewer: d[`Sewer${suffix}`],
          Drain: d[`Drain${suffix}`],
          Parks: d[`Parks${suffix}`],
          Library: d[`Library${suffix}`],
          Fire: d[`Fire${suffix}`],
          Police: d[`Police${suffix}`],
          GenGov: d[`GenGov${suffix}`],
          Schools: d[`Schools${suffix}`],
          Other: d[`Other${suffix}`],
        };
        const columns = [
          'Total',
          'NonUtil',
          'Roads',
          'Water',
          'Sewer',
          'Drain',
          'Parks',
          'Library',
          'Fire',
          'Police',
          'GenGov',
          'Schools',
          'Other',
        ];
        columns.forEach (keyName => {
          parseNum (newObj[cat], keyName);
        });
      });
      return newObj;
    })
    .filter (d => {
      return Object.values (d).length !== 0;
    });
}

exports.cleanData = cleanData;
