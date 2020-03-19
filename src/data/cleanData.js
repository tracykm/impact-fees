function parseNum(obj, key) {
  if (!obj[key]) {
    return delete obj[key]
  }
  if (typeof obj[key] === 'string') {
    if (obj[key].toLowerCase() === 'n/a') {
      return delete obj[key]
    }
    var newNum = Number(obj[key].replace('$', '').replace(',', ''))
    if (newNum !== newNum) {
      // create a new field to store this extra non-numeric info
      obj[`${key}Notes`] = obj[key]
      return delete obj[key]
    } else {
      // remove 0 values, so that averages don't take them into account
      // if (newNum == 0) {
      //   return delete obj[key];
      // }
      obj[key] = newNum
    }
  }
}

function parseDate(obj, key) {
  if (!obj[key]) {
    return delete obj[key]
  }
  if (typeof obj[key] === 'string') {
    if (obj[key].toLowerCase() === 'n/a') {
      return delete obj[key]
    }
    var newDate = Number(new Date(obj[key]))
    if (newDate !== newDate) {
      // create a new field to store this extra non-date info
      obj[`${key}Notes`] = obj[key]
      return delete obj[key]
    } else {
      obj[key] = newDate
    }
  }
}

function cleanData(data) {
  return data
    .map(d => {
      const newObj = {
        State: (d.State || '').length === 2 ? d.State : undefined,
        County: d.County !== 'County' ? d.County : undefined,
        Jurisdiction:
          typeof d.Jurisdiction === 'string' &&
          d.Jurisdiction !== 'Jurisdiction'
            ? d.Jurisdiction
            : undefined,
        Updated: d.Updated,
      }
      if (!newObj.State || !newObj.Jurisdiction) {
        return {}
      }
      // console.log(d);
      parseDate(newObj, 'Updated')
      let catts = [
        'SingleFamily',
        'MultiFamily',
        'Retail',
        'Office',
        'Industrial',
      ]
      catts.forEach((cat, i) => {
        let suffix = `__${i}`
        if (i === 0) {
          suffix = ''
        }
        newObj[cat] = {
          Total: d[`Total${suffix}`],
          NonUtil: d[`NonUtil${suffix}`] || d[`Non-Util${suffix}`],
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
        }
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
        ]
        columns.forEach(keyName => {
          // console.log(keyName, newObj[cat]);
          parseNum(newObj[cat], keyName)
        })
      })
      return newObj
    })
    .filter(d => {
      return (
        Object.values(d).length !== 0 &&
        // any of it's children have values
        Object.values(d).find(d => d && Object.keys(d).length)
      )
    })
  // .filter(d => {
  //   console.log(d);
  //   return Object.values(d).length !== 0;
  // });
}

exports.cleanData = cleanData
