'use strict'
// service to pass our refined data and other information
const Report = require('../Processors/Report')
// eg DRG Description || Description for procedure name
// and Avg Chg || Charge || Price || CHARGE AMOUNT for the price value.

// Remember to always set the name of the algorithm or
// this file because files processed by this file(algorithm)
// will be moved to a folder named after this file

const name = 'ByKeyName'

//ifPrice
function ifPrice(key, value) {
    let price = null
    price = key.toLowerCase()
    price = price.includes('charge') ||
        price.includes('amount') ||
        price.includes('amnt') ||
        price.includes('amt') ||
        price.includes('price') ||
        price.includes('fee') ||
        price.includes('cost') ||
        price.includes('payment') ||
        price.includes('avg chg')

        ? value // return value
        : null // else no price to match

    // refine further
    let anotherKey = key.toLowerCase()
    if(anotherKey.includes('code') || anotherKey.includes('charge description')) price = null // like charge code not being price

    // check if value is a string
    //if (value.match(/a-z/i)) price = null

    // if value starts with $ price === value
    if (value.startsWith('$')) price = value

    return price
}

//ifProcedure
function ifProcedure(key, value) {
    let procedure = ''

    procedure = key.toLowerCase()
    procedure = procedure.includes('description') ||
        procedure.includes('drg') ||
        procedure.includes('procedure') ||
        procedure.includes('billing description')

        ? value
        : null

    // refine further
    let anotherKey = key.toLowerCase()
    if(anotherKey.includes('code')) procedure = null // if key contains the word code, return null too

    return procedure
}

function ifItem(data) {
    let item = {}
    let price = []
    let procedure = []
    let itemData = {}

    for (let [key, value] of Object.entries(data)) {

        // item contains a key and a value
        // key for field name eg amt or description
        // value either the price value or the procedure/DRG name
        itemData = {
            key,
            value
        }

        if (ifProcedure(key, value)) procedure.push(itemData)
        if (ifPrice(key, value)) price.push(itemData)

    }

    // match field here and return the values with key for confirmation



    item = {
        procedure,
        price,
    }



    return JSON.stringify(item)

}

//result item
function matchValues(args) {

    const { data, filePath, index, totalItems } = args

    /*console.log('****************data*****************')
    console.log(data)
    console.log('****************data*************************')*/
    let refinedData = ifItem(data)
    // return five objects for now
    let dt = {
        data, // raw json data from csv file
        refinedData, // data processed by this algo
        filePath, // path of the csv file that owns this data
        name, // name of this file or module that's refining/processing the data
        index, // index of the item in array
        totalItems// the total number of items after the csv is converted to json
    }

    // pass your data to post to database and sort the file (cvs) that owns this data
    return Report.rawReportData(dt)


}

module.exports = {
    matchValues
}