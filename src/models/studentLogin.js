const mongoose = require('mongoose')

const StudentLoginSchema = new mongoose.Schema({
    name: { //1
        type: String,
        required: true,
    },
    password: { //2 
        type: String,
        required: true
    },
    phoneNumber: { //3 
        type: String,
        required: false,
        length: 10
    },
    emailId: { //4
        type: String,
        required: true,
        unique: true
    },
    date: {   // User Creation Date
        type: Date,
        default: Date.now
    },
    verification: { // User Verification 
        phoneNumber: {
            type: Boolean,
            default: false
        },
        email: {
            type: Boolean,
            default: false
        },
        enrollmentNumber: {
            type: Boolean,
            default: false
        }
    }
})


module.exports = mongoose.model('StudentLogin', StudentLoginSchema)