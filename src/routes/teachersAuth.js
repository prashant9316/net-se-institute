const router = require('express').Router()

const { registerStudent, loginStudent } = require('../controllers/studentAuthController')

// router.post('/register-student', registerStudent)

router.post('/teacher-login', loginStudent)


module.exports = router