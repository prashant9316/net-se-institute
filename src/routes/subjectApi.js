const { addNotes, updateNotes, removeNotes, getNotes, addAssign, updateAssign, removeAssign, getAssign, addSyllabus, updateSyllabus, removeSyllabus, getSyllabus, addPaper, updatePaper, removePaper, getPapers, addAnnouncement } = require('../controllers/subjectController')
const { verifyTeacher } = require('../services/verifyJwt')

const router = require('express').Router()


/////////// NOTES ///////////

router.post('/addNotes/:subjectId', verifyTeacher, addNotes)

router.post('/updateNotes/:noteId', verifyTeacher, updateNotes)

router.post('/removeNotes/:noteId', verifyTeacher, removeNotes)

router.get('/getNotes/:subjectId', verifyTeacher, getNotes)




/////////// ASSIGNMENTS ///////////

router.post('/addAssign/:subjectId', verifyTeacher, addAssign)

router.post('/updateAssign/:noteId', verifyTeacher, updateAssign)

router.post('/removeAssign/:noteId', verifyTeacher, removeAssign)

router.get('/getAssign/:subjectId', verifyTeacher, getAssign)



/////////// SYLLABUS ///////////

router.post('/addSyllabus/:subjectId', verifyTeacher, addSyllabus)

router.post('/updateSyllabus/:subjectId', verifyTeacher, updateSyllabus)

router.post('/removeSyllabus/:subjectId', verifyTeacher, removeSyllabus)

router.get('/getSyllabus/:subjectId', verifyTeacher, getSyllabus)


/////////// PAPER ///////////

router.post('/addPaper/:subjectId', verifyTeacher, addPaper)

router.post('/updatePaper/:paperId', verifyTeacher, updatePaper)

router.post('/removePaper/:paperId', verifyTeacher, removePaper)

router.get('/getPapers/:subjectId', verifyTeacher, getPapers)


/////////// ANNOUNCEMENTS ///////////

router.post('/addAnnouncement/:subjectId', verifyTeacher, addAnnouncement)


module.exports = router