const TeacherProfile = require('./../models/teachersProfile')


const getTeacherSubjects = async(req, res) => {
    try {
        const teacher = await TeacherProfile.findOne({ _id: req.params._id })
    } catch (error) {
        
    }
}


module.exports = {
    getTeacherSubjects
}