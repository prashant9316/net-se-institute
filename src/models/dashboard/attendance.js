const mongoose = require('mongoose')
const shortid = require('shortid')


const Attendance = new mongoose.Schema({
    pageId: {
        type: String,
        default: shortid.generate
    },
    attendance: [{
        name: String,
        enrollNumber: String,
        attendance: String,
    }],
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
    teacherName: {
        type: String,
        required: true
    },
    teacherId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Attendance', Attendance)