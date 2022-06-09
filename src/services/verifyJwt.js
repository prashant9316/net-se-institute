const jwt = require('jsonwebtoken')
const TeacherProfile = require('./../models/teachersProfile')


const verifyLoginRedirect = async(req, res, next) => {
    try {
        const token = req.cookies.AuthToken

        if(!token) {
            next()    
        }

        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = verified;
        if(verified.role =='baap'){
            return res.redirect('/main-admin/dashboard')
        }
        next();
    } catch (error) {
        console.log("ERROR in verify JWT, login redirect: "+error)
        next()
    }
}


const verifyToken = async(req, res, next) => {``
    try {
        const token = req.cookies.AuthToken

        if(!token) {
            console.log("Redirecting from VerifyJWT.js")
            return res.status(401).json({ error: "YOur are not loged in!"})
        }

        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = verified;

        next();

    } catch (error) {
        console.log("ERROR in verifyJWT.js: "+error)
        return res.redirect('/');
    }
}




const verifyTeacher = async(req, res, next) => {``
    try {
        const token = req.cookies.AuthToken

        if(!token) {
            console.log("Redirecting from VerifyJWT.js")
            return res.status(401).json({ error: "YOur are not loged in!"})
        }

        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        if(verified.role == 'teacher'){
            // console.log(verified)
            const teacherProfile = await TeacherProfile.findOne({ emailId: verified.emailId })
            req.user = verified;
            req.user.profile = teacherProfile;
            // console.log(req.user)
            next()
        }
        else {
            return res.redirect('/');
        }

    } catch (error) {
        console.log("ERROR in verifyJWT.js: "+error)
        return res.redirect('/');
    }
}





const verifyAdmin = async(req, res, next) => {
    try {
        const token = req.cookies.AuthToken

        if(!token) {
            console.log("Redirecting from VerifyJWT.js")
            return res.redirect('/')
            return res.status(401).json({ error: "YOur are not loged in!"})
        }

        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        if(verified.role == 'admin'){
            req.user = verified;
            next()
        }
        else {
            return res.redirect('/');
        }

    } catch (error) {
        console.log("ERROR in verifyJWT.js: "+error)
        return res.redirect('/');
    }
}



const verifyBaap = async(req, res, next) => {
    try {
        const token = req.cookies.AuthToken

        if(!token) {
            console.log("Redirecting from VerifyJWT.js")
            return res.redirect('/')
            return res.status(401).json({ error: "YOur are not loged in!"})
        }

        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        if(verified.role == 'baap'){
            req.user = verified;
            next()
        }
    } catch (error) {
        console.log("ERROR in verifyJWT.js/verifyBaap: "+error)
        return res.redirect('/');
    }
}


module.exports = {
    verifyToken,
    verifyAdmin,
    verifyTeacher,
    verifyBaap,
    verifyLoginRedirect
}