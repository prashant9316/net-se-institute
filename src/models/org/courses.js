const mongoose = require('mongoose')
const shortid = require('shortid')

const Courses = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true,
        default: shortid.generate
    },
    courseDuration: {
        type: Number
    },  
    courseDetails: {
        type: String
    },
    collegeId: {
        type: String, 
        required: true,
    }
})

module.exports = mongoose.model('Courses', Courses)