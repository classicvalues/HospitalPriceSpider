'use strict'
// service to pass our refined data and other information
//const Report = require('../Processors/Report')
// eg DRG Description || Description for procedure name
// and Avg Chg || Charge || Price || CHARGE AMOUNT for the price value.

// Remember to always set the name of the algorithm or
// this file because files processed by this file(algorithm)
// will be moved to a folder named after this file

//ifPrice

// convert price to a double if not
function ifPrice(key, value) {
    let price = null
    let starts = 0
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
    if(anotherKey.includes('code') || anotherKey.includes('charge description')
        || anotherKey.includes('number' || anotherKey.includes('schedule')  )) price = null // like charge code not being price

    // check if value is a string
    //if (value.match(/a-z/i)) price = null

    // if value starts with $ price === value
    if ( /^$/.test(value) ) price = value

    return price
}

//ifProcedure
function ifProcedure(key, value) {
    let procedure = ''
    let numbers = /^\d+$/
    procedure = key.toLowerCase()
    procedure = procedure.includes('description') ||
        procedure.includes('drg') ||
        procedure.includes('procedure') ||
        procedure.includes('billing description')

        ? value
        : null

    // refine further
    let anotherKey = key.toLowerCase()
    //if(anotherKey.includes('code') || anotherKey.includes('number')) procedure = null // if key contains the word code, return null too
    if(anotherKey.includes('code')) procedure = null // if key contains the word code, return null too

    if (numbers.test(value)) procedure = null // if value is all numbers

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

    //console.log(args)
    //console.log('|||||||||||||||args||||||||||||')


    let refined = ifItem(args)
    // return five objects for now
    let dt = {
        refined, // data processed by this algo
    }

    // pass your data to post to database and sort the file (cvs) that owns this data
    //return Report.rawReportData(dt)



    return dt


}

module.exports = {
    matchValues
}