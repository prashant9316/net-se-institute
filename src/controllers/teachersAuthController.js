// const StudentUser = require('./../models/studentLogin')
// const StudentProfileSchema = require('./../models/studentProfile')

const TeacherLogin = require('./../models/teacherLogin')
const TeacherProfile = require('./../models/teachersProfile')

const bcrypt = require('bcrypt')
const generateToken = require('./../services/generateJwt')




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


const loginStudent = async(req, res) => {
    try {
        const studentUser = await StudentUser.findOne({ emailId: req.body.email })

        if(!studentUser){
            return res.json({
                status: 404,
                error: "Student Not Found!"
            })
        }
        const validPass = await bcrypt.compare(req.body.password, studentUser.password)
        if(!validPass){
            return res.json({
                status: 401,
                error: "Password does not match",
                message: "Password does not match"
            })
        }

        const token = await generateToken(studentUser);
        
        // res.cookie(`AuthToken`, token, {
        //     httpOnly: true
        // })

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

module.exports = {
    registerStudent,
    loginStudent
}