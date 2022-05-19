const AdminLogin = require('./../models/adminLogin')
const bcrypt = require('bcrypt')
const generateJwt = require('./../services/generateJwt')


const loginAdmin = async(req, res) => {
    try {
        const adminUser = await AdminLogin.findOne({ username: req.body.username })

        if(!adminUser){
            return res.json({
                status: 404,
                error: "Admin Not Found!"
            })
        }
        const validPass = await bcrypt.compare(req.body.password, adminUser.password)
        if(!validPass){
            return res.json({
                status: 401,
                error: "Password does not match",
                message: "Password does not match"
            })
        }

        const token = await generateJwt(adminUser);

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
    loginAdmin
}