const express = require('express')
const router = express.Router()
const payload_model = require('../models/payload.model')

module.exports = router

router.get('/', async (req, res) => {
    await payload_model.getAllPayloads()
    .then(payloads => res.json(payloads))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

router.get('/:application_id', async (req, res) => {
    const application_id = req.params.application_id
    await payload_model.getApplicationPayload(application_id)
    .then(payload => res.json(payload))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})


router.post('/', async (req, res) => {
    await payload_model.storePayload(req.body)
    .then(payload => res.status(201).json({
        message: `The payload for ${payload} has been stored.`,
        content: payload
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})
