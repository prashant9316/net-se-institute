const TeachersLogin = require('./../models/teacherLogin')
const TeachersProfile = require('./../models/teachersProfile')
const bcrypt = require('bcrypt')



const registerNewTeacher = async(req, res) => {
    try {
        const emailExist = await TeachersLogin.findOne({ emailId: req.body.email })

        if(emailExist){
            return res.json({
                status: 400,
                error: 'Email Already Taken!'
            })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const newTeacher = new TeachersLogin({
            name: req.body.username,
            password: hashedPassword,
            phoneNumber: req.body.phone,
            emailId: req.body.email,
            collegeId: req.user.collegeId
        })

        const newTeacherProfile = new TeachersProfile({
            name: req.body.username, 
            emailId: req.body.email,
            phoneNumber: req.body.phone,
            collegeId: req.user.collegeId,
            gender: req.body.gender,
            college: req.body.college
        })
        await newTeacher.save()
        await newTeacherProfile.save()
        return res.status(200).json({
            status: 200,
            message: "New Teacher Registered Successfully!!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}

module.exports = {
    registerNewTeacher
}