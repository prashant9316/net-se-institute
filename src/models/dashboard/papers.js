const mongoose = require('mongoose')
const shortid = require('shortid')


const Papers = new mongoose.Schema({
    paperTitle: {
        type: String,
        required: true
    },
    paperId: {
        type: String,
        default: shortid.generate
    },
    pdfLink: {
        type: String,
        required: true
    },
    paperYear: {
        type: String,
        required: true
    },
    subjectId: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    collegeId: {
        type: String,
        required: true
    },
    uploadDetails: {
        uploader: String,
        about: String
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Papers', Papers)