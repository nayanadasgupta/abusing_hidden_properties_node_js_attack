const e = require('express')
const fs = require('fs')
const helper = require('../helpers/helper')
const filename = '/Users/NayanaDasgupta/Documents/Computer Security II/abusing_hidden_properties_node_js_attack/data/payloads.json'
let payloads = require(filename)

function getAllPayloads() {
    return new Promise((resolve, reject) => {
        if (payloads.length === 0) {
            reject({
                message: 'No Payloads Exist',
                status: 202
            })
        }
        resolve(payloads)
    })
}

function getApplicationPayload(application_id) {
    return new Promise((resolve, reject) => {
        const row = payloads.find(r => r.application_id == application_id)
        if (!row) {
            reject({
                message: 'No payload exists for this application',
                status: 404
            })
        }
        resolve(row)
    })
}

function deletePayload(application_id) {
    return new Promise((resolve, reject) => {
        helper.get_payload(payloads, application_id)
        .then(() => {
            console.log("payloads", payloads)
            payloads = payloads.filter(p => p.application_id !== application_id)
            console.log("payloads after", payloads)
            fs.writeFile(filename, JSON.stringify(payloads), 'utf8', (err) => {
                if (err) {
                    console.log(err)
                }
            })
            resolve()
        })
        .catch(err => reject(err))
        console.log("HHHHH")
    })
}

function storePayload(application_id, actual_payload) {
    return new Promise((resolve, _) => {
        deletePayload(application_id)
        payloads.push({...application_id, ...actual_payload})
        fs.writeFile(filename, JSON.stringify(payloads), 'utf8', (err) => {
            if (err) {
                console.log(err)
            }
        })
        resolve(payloads)
    })
}


module.exports = {
    getAllPayloads,
    getApplicationPayload, 
    deletePayload,
    storePayload
}