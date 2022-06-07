const mongoose = require('mongoose')
const shortid = require('shortid')



const Assignments = new mongoose.Schema({
    assignmentTitle: {
        type: String,
        required: true
    },
    pdfLink: {
        type: String,
        required: false
    },
    assignmentId: {
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
    uploaderDetails: {
        name: String,
        about: String
    }
})





module.exports = mongoose.model('Assignments', Assignments)
