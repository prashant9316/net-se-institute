const router = require('express').Router()

const { registerNewTeacher, assignSubjectsToTeacher } = require('../controllers/teachersController')
const { addNewCourse, addNewSubject } = require('./../controllers/orgController')
const { verifyAdmin } = require('../services/verifyJwt')



router.post('/registerNewTeacher', verifyAdmin, registerNewTeacher)

router.post('/addNewCourse', verifyAdmin, addNewCourse)

router.post('/addNewSubject', verifyAdmin, addNewSubject)

router.post('/assignSubjectToTeacher/:id',
    // verifyAdmin,
    assignSubjectsToTeacher
)

module.exports = router
