'use strict'

// Algorithm services
const ByKeyName = require('../Algorithms/ByKeyName')

// Example data match also
// see what it returns and takes as an argument
function exampleDataMatch(args) {

    const { data, filePath } = args

    let refinedItem = {}
    let price = {}
    let procedureName = ''

    console.log('************************************************')
    console.log(data)
    console.log('************************************************')


    for (let [key, value] of Object.entries(data)) {
        console.log(`${key}: ${value}`)

        // match field here and post to db, move file somewhere else
        // TODO!!!
    }




    return args
}


// pass your function here that should return
// a complete matched data object with procedure name and the price(s)
// for each procedure, also include to each algorithm a name for it
// and the folder name the files processed by the algorithm should
// go to..return this data object
// TODO find a better way still to do what this file does
function matchItemData(args) {

    const { jsonData, filePath } = args

    jsonData.map((item, index) => {

        let dt = {
            data: item, // give key
            index,
            filePath, // give key
            totalItems: jsonData.length // we need total items and index to move the file when done
        }

        // TODO do better
        // pass data to your service below
        ByKeyName.matchValues(dt)
    })

}
// get data and send to listener
function initListenToConversion(args) {


    const { csvJson, filePath  } = args

    let jsonData = csvJson.filter(dt => dt)


    let data = {
        jsonData,
        filePath,
    }

    matchItemData(data)

}

module.exports = {
    initListenToConversion
}