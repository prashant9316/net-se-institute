const router = require('express').Router()

const {  loginTeacher } = require('../controllers/teachersAuthController')


router.post('/teacher-login', loginTeacher)


module.exports = router