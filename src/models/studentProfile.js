const mongoose = require('mongoose')

const StudentProfileSchema = new mongoose.Schema({
    name: { //1
        type: String,
        required: true,
    },
    phoneNumber: { //2
        type: String,
        required: false,
        length: 10,
        unique: true,
        sparse: true
    },
    emailId: { //3
        type: String,
        required: true,
        unique: true
    },
    enrollmentNumber: { //4
        type: String,
        required: false,
        unique: true,
        sparse: true
    },
    college: {  // 5
        type: String,
    },
    collegeId: {
        type: String
    },
    course: {  // 6
        courseName: String,
        courseId: String,
        currentYear: Number,
        sem: Number
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    courseRequest: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('StudentProfile', StudentProfileSchema)