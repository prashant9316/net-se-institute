const router = require('express').Router()

const { loginAdmin } = require('./../controllers/adminAuthController')
// router.post('/register-student', registerStudent)

router.post('/admin-login', loginAdmin)




module.exports = router