const MainAdminDB = require('./../models/mainAdmin')
const Colleges = require('./../models/org/colleges')
const bcrypt = require('bcrypt')
const generateJwt = require('./../services/generateJwt')
const adminLogin = require('../models/adminLogin')


const loginMainAdminRouter = async(req, res) => {
    try {
        console.log(req.params.phoneNumber)
        const mainAdmin = await MainAdminDB.findOne({ phoneNumber: req.params.phoneNumber })
        if(mainAdmin){
            return res.render('mainadmin/login', {
                id: mainAdmin.phoneNumber
            })
        }
        return res.redirect('/')
    } catch (error) {
        console.log(error)
        return res.redirect('/')
    }
}


const loginAuthMainAdmin = async(req, res) => {
    try {
        const mainAdmin = await MainAdminDB.findOne({ phoneNumber: req.params.phoneNumber })
        if(!mainAdmin){
            return res.redirect('/')
        }
        const validPass = await bcrypt.compare(req.body.password, mainAdmin.password)
        if(!validPass){
            return res.json({
                status: 401,
                error: "password does not match",
                message: "password does not match",
            })
        }

        const token = await generateJwt(mainAdmin)
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



const indexRouterMainAdmin = async(req, res) => {
    return res.render('mainadmin/dashboard', {
        admin: req.user
    })
}


const createNewCollegeId = async(req, res) => {
    return res.render('mainadmin/newCollege', {
        admin: req.user
    })
}


const formNewCollege = async(req, res) => {
    try {
        const newCollege = new Colleges({
            collegeName: req.body.collegeName,
            logoLink: req.body.imageLink,
            officialWebsite: req.body.officialWebsite,
        })
        await newCollege.save();
        return res.status(200).json({
            code: 200,
            message: "New College Registered!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
}



const viewAllCollege = async(req, res) => {
    try {
        const colleges = await Colleges.find({})
        return res.render('mainadmin/collegeList', {
            admin: req.user,
            colleges
        })
    } catch (error) {
        return res.redirect('/main-admin/dashbaord')
    }
}


const viewOneColleges = async(req, res) => {
    try {
        const college = await Colleges.findOne({ collegeId: req.params.collegeId })
        const admins = await adminLogin.find({ collegeId: req.params.collegeId})
        return res.render('mainadmin/collegeDetails', {
            admin: req.user,
            college,
            admins
        })
    } catch (error) {
        return res.redirect('/main-admin/dashbaord')
        
    }
}


const createAdminLoginCredentialsForCollegeForm = async(req, res) => {
    try {
        const college = await Colleges.find({ collegeId: req.params.collegeId })
        return res.render('mainadmin/newCollegeCredentials', {
            admin: req.user,
            college
        })
    } catch (error) {
        return res.redirect('/main-admin/dashboard')
    }
}


const createAdminLoginCredentialsForCollegeAction = async(req, res) =>{
    try {
        console.log(req.body)
        const college = await Colleges.findOne({ collegeId: req.params.collegeId })
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newAdmin = new adminLogin({
            username: req.body.username,
            password: hashedPassword,
            phoneNumber: req.body.phoneNumber,
            collegeName: college.collegeName,
            collegeId: college.collegeId,
            role: 'admin'
        })
        await newAdmin.save();
        return res.status(200).json({
            code: 200,
            message: "New Admin Registered!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
}

module.exports = {
    loginMainAdminRouter,
    loginAuthMainAdmin,
    indexRouterMainAdmin,
    createNewCollegeId,
    formNewCollege,
    viewAllCollege,
    viewOneColleges,
    createAdminLoginCredentialsForCollegeForm,
    createAdminLoginCredentialsForCollegeAction
}