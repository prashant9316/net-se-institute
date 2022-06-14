const router = require('express').Router()

const {  loginTeacher, resetPassword } = require('../controllers/teachersAuthController')
const { verifyTeacher } = require('../services/verifyJwt')


router.post('/teacher-login', loginTeacher)

router.post('/resetPassword', verifyTeacher, resetPassword)


module.exports = router