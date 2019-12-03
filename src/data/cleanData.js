function parseNum(obj, key) {
    if(!obj[key]) {
        return obj[key] = undefined
    }
    if (typeof obj[key] === 'string') {
        if(obj[key].toLowerCase() === 'n/a') {
            return obj[key] = undefined
        }
        var newNum = Number(obj[key].replace('$', '').replace(',', ''))
        if (newNum !== newNum) {
            console.error('Trouble parsing', obj)
        } else {
            obj[key] = newNum
        }
    }
}

function parseDate(obj, key) {
    if(!obj[key]) {
        return obj[key] = undefined
    }
    if (typeof obj[key] === 'string') {
        if(obj[key].toLowerCase() === 'n/a') {
            return obj[key] = undefined
        }
        var newDate = Number(new Date(obj[key]))
        if (newDate !== newDate) {
            console.error('Trouble parsing', obj)
        } else {
            obj[key] = newDate
        }
    }
}
function cleanData(data) {
    data.map(d => {
        parseNum(d, 'Total')
        parseNum(d, 'NonUtil')
        parseNum(d, 'Roads')
        parseNum(d, 'Water')
        parseNum(d, 'Sewer')
        parseNum(d, 'Drain')
        parseNum(d, 'Parks')
        parseNum(d, 'Library')
        parseNum(d, 'Fire')
        parseNum(d, 'Police')
        parseNum(d, 'GenGov')
        parseNum(d, 'Schools')
        parseNum(d, 'Other')
        parseDate(d, 'Updated')
        if(d[""] === "") {
            d[""] = undefined
        }
        if(d.State === "") {
            d.State = undefined
        }
        if(d.County === "") {
            d.County = undefined
        }
        if(d.Jurisdiction === "") {
            d.Jurisdiction = undefined
        }
        return d
    })
    return data
}

exports.cleanData = cleanData;