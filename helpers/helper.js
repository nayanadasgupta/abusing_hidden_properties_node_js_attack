const fs = require('fs')

function get_payload(array, application_id) {
    console.log("LOOK")
    console.log(array)
    console.log(application_id)
    return new Promise((resolve, reject) => {
        const row = array.filter(r => r.application_id === application_id)
        console.log(row)
        if (!row) {
            console.log("NO ROW")
            reject({
                message: 'No payload exists for this application',
                status: 404
            })
        }
        resolve(row)
    })
} 

function store_payload(filename, payloads) {
    fs.writeFileSync(filename, JSON.stringify(payloads), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    get_payload,
    store_payload
}