const mongoose = require('mongoose');
const shortid = require('shortid');

const TeacherLoginSchema = new mongoose.Schema({
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    collegeId: {
        type: String,
        required: true
    },
    teacherId: {
        type: String,
        default: shortid.generate
    },
    role: {
        type: String,
        default: 'teacher'
    }
});

module.exports = mongoose.model('TeacherLogin', TeacherLoginSchema);