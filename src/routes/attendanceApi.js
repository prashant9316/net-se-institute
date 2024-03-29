const { createNewPage, markStudentAsPresent, attendanceCountBySubjectId } = require('../controllers/attendanceController')
const { verifyTeacher } = require('../services/verifyJwt')

const router = require('express').Router()

router.post('/createNewPage/:subjectId', verifyTeacher, createNewPage)

router.post('/submitAttendance/:pageId', verifyTeacher, markStudentAsPresent)

router.get('/dashboard/:collegeId/attendance/:studentId', attendanceCountBySubjectId)

module.exports = router