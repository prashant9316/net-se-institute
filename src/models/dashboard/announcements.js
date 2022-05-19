const mongoose = require('mongoose')
const shortid = require('shortid')

const Announcements = new mongoose.Schema({
    collegeId: {
        type: String,
        required: true
    },
    classId: {
        type: String,
        required: true
    },
    subjectId: {
        type: String,
        required: true
    },
    announcementId: {
        type: String,
        default: shortid.generate()
    },
    announcementBy: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    announcement: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Announcements', Announcements)