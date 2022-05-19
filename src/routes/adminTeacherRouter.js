const router = require('express').Router()

const { registerNewTeacher } = require('../controllers/teachersController')
const { addNewCourse, addNewSubject } = require('./../controllers/orgController')
const { verifyAdmin } = require('../services/verifyJwt')



router.post('/registerNewTeacher', verifyAdmin, registerNewTeacher)

router.post('/addNewCourse', verifyAdmin, addNewCourse)

router.post('/addNewSubject', verifyAdmin, addNewSubject)

module.exports = router
