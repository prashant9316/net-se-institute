const mongoose = require('mongoose')
const shortid = require('shortid')

const Colleges = new mongoose.Schema({
    collegeName: {
        type: String,
        required: true
    },
    logoLink: {
        type: String,
        required: true
    },
    collegeId: {
        type: String,
        default: shortid.generate
    },
    officialWebsite: {
        type: String,
    },
    collegeDetails: {
        address: String,
        pinCode: String,
    }
})

module.exports = mongoose.model('Colleges', Colleges)