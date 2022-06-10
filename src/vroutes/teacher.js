const router = require('express').Router()
const Colleges = require('./../models/org/colleges')
const { getAllStudentsByCollegeService, getStudentByCourseIdAndCollegeService, getStudentProfile, getStudentBySubjectId } = require('../controllers/studentsController');
const { verifyTeacher } = require('../services/verifyJwt')

const Subjects = require('./../models/org/subjects')
const Courses = require('./../models/org/courses');
const Attendance = require('./../models/dashboard/attendance')
const { getAllAssetsForSubjectWithIdService } = require('../controllers/subjectController');
const { getAttendanceRegister, getAttendanceRegisterBySubjectId, getAttendanceRegisterByTeacher } = require('../controllers/attendanceController');


router.get('/login/:collegeId', async(req, res) => {
    try {
        const college = await Colleges.findOne({ collegeId: req.params.collegeId })
        if(!college){
            return res.redirect('/')
        } 
        return res.render('teachers/login', {
            college
        })
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
    
})


router.get('/dashboard', verifyTeacher, async(req, res) => {
    return res.redirect(`/admin/dashboard/${req.user.collegeId}`, {
        teacher: req.user
    })
})

router.get('/dashboard/:collegeId', verifyTeacher, async(req, res) => {
    return res.render('teachers/dashboard', {
        teacher: req.user
    })
})



router.get('/dashboard/:collegeId/view-courses', verifyTeacher, async(req, res) => {
    return res.render('teachers/viewCourses', {
        teacher: req.user
    })
})

// router.get('/dashboard/:collegeId/create-new-course', verifyTeacher, async(req, res) => {
//     return res.render('teachers/createCourse', {
//         teacher: req.user
//     })
// })

router.get('/dashboard/:collegeId/view-all-subjects', verifyTeacher, async(req, res) => {
    try {
        const subjects = await Subjects.find({})
        const courses = await Courses.find({ collegeId: req.user.collegeId })
        return res.render('teachers/viewSubjects', {
            teacher: req.user,
            subjects,
            courses,
            selectedCourse: 'All'
        })
    } catch (error) {
        return res.json({ error })
    }
})


router.get('/dashboard/:collegeId/my-subjects', verifyTeacher, async(req, res) => {
    try {
        const subjects = await Subjects.find({})
        const courses = await Courses.find({ collegeId: req.user.collegeId })
        return res.render('teachers/mySubjects', {
            teacher: req.user,
            subjects: req.user.profile.subjects,
            courses
        })

    } catch (error) {
        return res.json({ error })
    }
})


router.get('/dashboard/:collegeId/manage-subject/:subjectId', verifyTeacher, async(req, res) => {
    try {
        const { subject, announcements, notes, syllabus, papers, assignments, error} = await getAllAssetsForSubjectWithIdService(req)
        if(error){
            return res.redirect(401,'/teacher/dashboard')
        }
        return res.render('teachers/manageSubject', {
            teacher: req.user, 
            subject,
            announcements, 
            notes, 
            syllabus,
            papers,
            assignments
        })

    } catch (error) {
        return res.redirect(401,'/teacher/dashboard')

    }
    
})


router.get('/dashboard/:collegeId/subject/:courseId/:year/:sem', verifyTeacher, async(req, res) => {
    year = req.params.year
    sem = req.params.sem
    const courses = await Courses.find({})
    let subjects;
    if(req.params.courseId == 'All'){
        courseId = { $exists: true }
    } else {
        courseId = req.params.courseId
    }
    if(year == 0 && sem == 0){
        console.log("running for only course id: " + req.params.courseId)
        subjects = await Subjects.find({ collegeId: req.user.collegeId, courseId: courseId })
    } else if(year == 0){
        console.log("running courseId with sem")
        subjects = await Subjects.find({ collegeId: req.user.collegeId, courseId: courseId, sem: sem })
    } else if(sem == 0){
        console.log("running courseId with year")
        subjects = await Subjects.find({ collegeId: req.user.collegeId, courseId: courseId, year: year })
    } else {
        subjects = await Subjects.find({ collegeId: req.user.collegeId, courseId: courseId, year: year, sem: sem })

    }
    return res.render('teachers/viewSubjects', {
        teacher: req.user,
        subjects,
        courses,
        selectedCourse: req.params.courseId,
        sem,
        year
    })
})

router.get('/dashboard/:collegeId/manage-subject', verifyTeacher, async(req, res) => {
    return res.render('teachers/manageSubject', {
        teacher: req.user
    })
})

// router.get('/dashboard/:collegeId/create-new-subject', verifyTeacher, async(req, res) => {
//     const courses = await Courses.find({ collegeId: req.user.collegeId })
//     return res.render('teachers/createSubject', {
//         teacher: req.user,
//         courses
//     })
// })

router.get('/dashboard/:collegeId/view-all-students', verifyTeacher, async(req, res) => {
    const students = await getAllStudentsByCollegeService(req)
    const courses = await Courses.find({ collegeId: req.user.collegeId })
    return res.render('teachers/viewStudents', {
        teacher: req.user,
        students,
        courses,
        view:'all'
    })
})


router.get('/dashboard/:collegeId/students/:courseId', verifyTeacher, async(req, res) => {
    try {
        const students = await getStudentByCourseIdAndCollegeService(req)
        const courses = await Courses.find({ collegeId: req.user.collegeId })
        return res.render('teachers/viewStudents', {
            teacher: req.user,
            students,
            courses,
            view: req.params.courseId
        })
    } catch (error) {
        return res.redirect('/dashboard/'+req.params.collegeId)
    }
})


router.get('/dashboard/:collegId/student-profile/:studentId', verifyTeacher, async(req, res) => {
    const { student, error } = await getStudentProfile(req, res);
    if(error){
        console.log(error)
        return res.redirect('/teacher/dashboard')
    }
    return res.render('teachers/studentProfile', {
        teacher: req.user, 
        student
    })
})


router.get('/dashboard/:collegeId/manage-students', verifyTeacher, async(req, res) => {
    
    return res.redirect(`/teacher/dashboard/${req.user.collegeId}/manage-students/${req.user.profile.subjects[0].subjectId}`)
})



router.get('/dashboard/:collegeId/manage-students/:subjectId', verifyTeacher, async(req, res) => {
    const {students, error} = await getStudentBySubjectId(req, res);
    const courses = await Courses.find({ collegeId: req.user.collegeId })
    const subject = await Subjects.findOne({ subjectId: req.params.subjectId })

    if(error){
        console.log(error)
        return res.redirect(404, '/teacher/dashboad/')
    }
    return res.render('teachers/manageStudents', {
        teacher: req.user,
        students,
        subjects: req.user.profile.subjects,
        subject
    })
})



router.get('/dashboard/:collegeId/take-attendance/:pageId', verifyTeacher, async(req, res) => {
    const page = await Attendance.findOne({ pageId: req.params.pageId })
    req.params.subjectId = page.subjectId 
    const {students, error1} = await getStudentBySubjectId(req, res);
    if(error1){
        console.log(error)
        return res.redirect(404, '/teacher/dashboad/')
    }
    const subject = await Subjects.findOne({ subjectId: req.params.subjectId })
    const {attendanceRegister, error2} = await getAttendanceRegister(req, res)
    if(error2){
        console.log(error)
        return res.redirect(404, '/teacher/dashboad/')
    }
    return res.render('teachers/takeAttendance', {
        teacher: req.user,
        students: attendanceRegister.attendance,
        subject,
        attendanceRegister
    })
})


router.get('/dashboard/:collegeId/view-attendance/:pageId', verifyTeacher, async(req, res) => {
    const page = await Attendance.findOne({ pageId: req.params.pageId })
    req.params.subjectId = page.subjectId 
    const {students, error1} = await getStudentBySubjectId(req, res);
    if(error1){
        console.log(error)
        return res.redirect(404, '/teacher/dashboad/')
    }
    const subject = await Subjects.findOne({ subjectId: req.params.subjectId })
    const {attendanceRegister, error2} = await getAttendanceRegister(req, res)
    if(error2){
        console.log(error)
        return res.redirect(404, '/teacher/dashboad/')
    }
    return res.render('teachers/viewAttendance', {
        teacher: req.user,
        students: attendanceRegister.attendance,
        subject,
        attendanceRegister
    })
})


router.get('/dashboard/:collegeId/attendance-register', verifyTeacher, async(req, res) => {
    const {attendanceRegister , error} = await getAttendanceRegisterByTeacher(req, res);
    if(error){
        console.log(error)
        return res.redirect(404, '/teacher/dashboad/')
    }
    const subject = await Subjects.findOne({ subjectId: req.params.subjectId })
    return res.render('teachers/attendancePage', {
        teacher: req.user,
        subject,
        subjects: req.user.profile.subjects,
        attendanceRegister,
        view: 'None'
    })
})


router.get('/dashboard/:collegeId/attendance-register/:subjectId', verifyTeacher, async(req, res) => {
    const {attendanceRegister , error} = await getAttendanceRegisterBySubjectId(req, res)
    if(error){
        console.log(error)
        return res.redirect(404, '/teacher/dashboad/')
    }
    const subject = await Subjects.findOne({ subjectId: req.params.subjectId })
    return res.render('teachers/attendancePage', {
        teacher: req.user,
        subject,
        subjects: req.user.profile.subjects,
        attendanceRegister,
        view: 'None'
    })
})


module.exports = router
