const jwt = require('jsonwebtoken')


const generateJwt = async(user) => {
    if(!user){
        return -1;
    }
    const token = jwt.sign(
        {
            _id: user._id,
            phoneNumber: user.phoneNumber,
            role: user.role,
            emailId: user.emailId,
            collegeId: user.collegeId
        }, 
        process.env.SECRET_TOKEN
    )
    return token
}

module.exports = generateJwt;