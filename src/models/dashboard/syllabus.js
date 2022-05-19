const mongoose = require('mongoose')
const shortid = require('shortid')

const Syllabus = new mongoose.Schema({
    syllabusTitle: {
        type: String,
        required: true
    },
    pdfLink: {
        type: String,
        required: false
    },
    syllabusId: {
        type: String,
        default: shortid.generate
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
    uploadDate: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('Syllabus', Syllabus)