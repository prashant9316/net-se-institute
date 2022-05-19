const mongoose = require('mongoose')

const MainAdminLoginSchema = new mongoose.Schema({
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
    role: {
        type: String,
        default: 'baap'
    }
});

module.exports = mongoose.model('MainAdminLogin', MainAdminLoginSchema);