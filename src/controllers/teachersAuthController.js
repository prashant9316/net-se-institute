const StudentUser = require('./../models/studentLogin')
// const StudentProfileSchema = require('./../models/studentProfile')

const TeacherLogin = require('./../models/teacherLogin')
const TeacherProfile = require('./../models/teachersProfile')

const generateJwt = require('./../services/generateJwt')
const bcrypt = require('bcrypt')




const registerTeacher = async(req, res) => {
    try {
        const emailExist = await StudentUser.findOne({ emailId: req.body.email })

        if(emailExist){
            return res.json({
                status: 400,
                error: 'Email Already Taken!'
            })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const newStudent = new StudentUser({
            name: req.body.name,
            password: hashedPassword,
            emailId: req.body.email
        })

        const newStudentProfile = new StudentProfileSchema({
            name: req.body.name, 
            emailId: req.body.email
        })
        await newStudent.save()
        await newStudentProfile.save()
        return res.status(200).json({
            status: 200,
            message: "Student Registered Successfully!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}



const loginTeacher = async(req, res) => {
    try {
        console.log(req.body)

        const teacher = await TeacherLogin.findOne({ emailId: req.body.email })

        if(!teacher){
            return res.json({
                status: 404,
                error: "Teacher Not Found!"
            })
        }
        console.log(teacher)
        const validPass = await bcrypt.compare(req.body.password, teacher.password)
        if(!validPass){
            return res.json({
                status: 401,
                error: "Password does not match",
                message: "Password does not match"
            })
        }

        const token = await generateJwt(teacher);

        return res.json({
            status: 200,
            message: "Login Successful!",
            AuthToken: token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
}


const resetPassword = async(req, res) => {
    const teacher = await TeacherLogin.findOne({ emailId: req.user.emailId })
    if(!teacher){
        return res.json({
            status: 404,
            code: 404,
            error: "teacher not found!"
        })
    }
    const validPass = await bcrypt.compare(req.body.oldPassword, teacher.password)
    if(!validPass){
        return res.json({
            status: 401,
            code: 401,
            error: "Wrong Old Password",
            message: "Wrong Old Password"
        })
    }
    if(req.body.newPassword != req.body.reNewPassword){
        return res.json({
            status: 400,
            code: 400,
            error: "New Passwords typed don not match",
            message: "New Passwords typed don not match"
        })
    }
    const newHashedPassword = await bcrypt.hash(req.body.newPassword, 10)
    const udpatedTeacherProfile = await TeacherLogin.findOneAndUpdate(
        { emailId: req.user.emailId },
        {
            $set: {
                password: newHashedPassword
            }
        },{
            new: true
        }
    )
    return res.json({
        code: 200,
        status: 200,
        message: "Updated the password!"
    })
}

module.exports = {
    registerTeacher,
    loginTeacher,
    resetPassword
}