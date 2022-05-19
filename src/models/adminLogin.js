const mongoose = require('mongoose')

const AdminLoginSchema = new mongoose.Schema({
    username: {
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
    collegeName: {
        type: String,
        required: true
    },
    collegeId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'admin'
    }
});

module.exports = mongoose.model('AdminLogin', AdminLoginSchema);