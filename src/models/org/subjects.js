const mongoose = require('mongoose')
const shortid = require('shortid')


const Subjects = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true
    },
    subjectId: {
        type: String,
        default: shortid.generate
    },
    courseId: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    collegeId: {
        type: String,
        required: true
    },
    sem: {
        type: Number
    }
})

module.exports = mongoose.model('Subjects', Subjects)