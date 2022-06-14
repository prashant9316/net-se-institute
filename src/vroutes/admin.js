const router = require('express').Router()
const { getAllStudentsByCollegeService, getStudentByCourseIdAndCollegeService, getStudentProfile, setSem } = require('../controllers/studentsController');
const Colleges = require('./../models/org/colleges')
const Courses = require('./../models/org/courses')
const Subjects = require('./../models/org/subjects')

const TeacherProfile = require('./../models/teachersProfile');

const { verifyAdmin } = require('./../services/verifyJwt');

router.get('/login/:collegeId', async(req, res) => {
    const college = await Colleges.findOne({ collegeId: req.params.collegeId })
    if(!college){
        return res.redirect('/')
    } 

    return res.render('admin/login', {
        college
    })
})


router.get('/dashboard', verifyAdmin, async(req, res) => {
    return res.redirect(`/admin/dashboard/${req.user.collegeId}`, {
        admin: req.user
    })
})


router.get('/dashboard/:collegeId', verifyAdmin, async(req, res) => {
    return res.render('admin/dashboard', {
        admin: req.user
    })
})




router.get('/dashboard/:collegeId/view-teachers', verifyAdmin, async(req, res) => {
    const teachers = await TeacherProfile.find({ collegeId: req.user.collegeId })
    return res.render('admin/viewTeachers', {
        admin: req.user,
        teachers
    })
})


router.get('/dashboard/:collegeId/teacher/:teacherId', verifyAdmin, async(req, res) => {
    const teacher = await TeacherProfile.findOne({ collegeId: req.user.collegeId, emailId: req.params.teacherId })
    const subjects = await Subjects.find({})
    return res.render('admin/teacherProfile', {
        admin: req.user,
        teacher,
        subjects
    })
})



router.get('/dashboard/:collegeId/create-new-teacher', verifyAdmin, async(req, res) => {
    return res.render('admin/createTeacher', {
        admin: req.user
    })
})

router.get('/dashboard/:collegeId/view-courses', verifyAdmin, async(req, res) => {
    const courses = await Courses.find({ collegeId: req.params.collegeId })

    return res.render('admin/viewCourses', {
        admin: req.user,
        courses
    })
})

router.get('/dashboard/:collegeId/create-new-course', verifyAdmin, async(req, res) => {
    return res.render('admin/createCourse', {
        admin: req.user
    })
})

router.get('/dashboard/:collegeId/view-all-subjects', verifyAdmin, async(req, res) => {
    const subjects = await Subjects.find({})
    const courses = await Courses.find({ collegeId: req.user.collegeId })
    return res.render('admin/viewSubjects', {
        admin: req.user,
        subjects,
        courses,
        selectedCourse: 'All'
    })
})


// router.get('/api/set-sem', verifyAdmin, setSem)


router.get('/dashboard/:collegeId/subject/:courseId/:year/:sem', verifyAdmin, async(req, res) => {
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
        console.log("running for only course id: "+req.params.courseId)
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
    return res.render('admin/viewSubjects', {
        admin: req.user,
        subjects,
        courses,
        selectedCourse: req.params.courseId,
        sem,
        year
    })
})

router.get('/dashboard/:collegeId/manage-subject', verifyAdmin, async(req, res) => {
    return res.render('admin/manageSubject', {
        admin: req.user
    })
})

router.get('/dashboard/:collegeId/create-new-subject', verifyAdmin, async(req, res) => {
    const courses = await Courses.find({ collegeId: req.user.collegeId })
    return res.render('admin/createSubject', {
        admin: req.user,
        courses
    })
})

router.get('/dashboard/:collegeId/view-all-students', verifyAdmin, async(req, res) => {
    const students = await getAllStudentsByCollegeService(req)
    const courses = await Courses.find({ collegeId: req.user.collegeId })
    return res.render('admin/viewStudents', {
        admin: req.user,
        students,
        courses,
        view:'all'
    })
})


router.get('/dashboard/:collegeId/students/:courseId', verifyAdmin, async(req, res) => {
    const students = await getStudentByCourseIdAndCollegeService(req)
    const courses = await Courses.find({ collegeId: req.user.collegeId })
    return res.render('admin/viewStudents', {
        admin: req.user,
        students,
        courses,
        view: req.params.courseId
    })
})


router.get('/dashboard/:collegId/student-profile/:studentId', verifyAdmin, async(req, res) => {
    const { student, error } = await getStudentProfile(req, res);
    if(error){
        console.log(error)
        return res.redirect('/dashboard')
    }
    return res.render('admin/studentProfile', {
        student, 
        admin: req.user
    })
})


router.get('/dashboard/:collegeId/manage-students', verifyAdmin, async(req, res) => {
    return res.render('admin/manageStudents', {
        admin: req.user
    })
})

router.get('/dashboard/:collegeId/account-settings', verifyAdmin, async(req, res) => {
    return res.render('admin/accountSettings', {
        admin: req.user
    })
})


router.get('/dashboard/:collegeId/setup-college-account', verifyAdmin, async(req, res) => {
    return res.render('admin/setupCollege', {
        admin: req.user
    })
})



module.exports = router
