const mongoose = require('mongoose')

const TeachersProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    emailId: { //3
        type: String,
        required: true,
        unique: true
    },
    college: {  // 5
        type: String,
    },
    collegeId: {
        type: String
    },
    gender: {
        type: String
    },
    courseIds: [{
        courseId: String
    }],
    subjects: [{
        subjectId: String,
        courseId: String,
        subjectName: String,
        sem: Number,
        year: Number
    }]
})


module.exports = mongoose.model('TeachersProfile', TeachersProfileSchema)