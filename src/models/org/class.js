const mongoose = require('mongoose')
const shortid = require('shortid')

const Classes = new mongoose.Schema({
    classId: {
        type: String,
        required: shortid.generate(),
        unique: true
    },
    className: {
        type: String,
        required: true,
    },
    subjectName: {
        type: String,
        required: true
    },
    subjectId: {
        type: String,
        required: true
    },
    collegeId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Classes', Classes)