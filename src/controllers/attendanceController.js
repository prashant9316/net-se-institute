const Subjects = require('./../models/org/subjects')
const Attendance = require('./../models/dashboard/attendance')
const StudentProfile = require('./../models/studentProfile')
const { getStudentBySubjectId } = require('./studentsController')


const getAttendanceRegister = async(req, res) => {
    try {
        const attendanceRegister = await Attendance.findOne({ pageId: req.params.pageId })
        return {attendanceRegister}
    } catch (error) {
        console.log(error)
        return {error}
    }
}



const getAttendanceRegisterBySubjectId = async(req, res) => {
    try {
        const attendanceRegister = await Attendance.find({ subjectId: req.params.subjectId, teacherId: req.user.profile._id })
        return {attendanceRegister}
    } catch (error) {
        console.log(error)
        return {error}
    }
}


const getAttendanceRegisterByTeacher = async(req, res) => {
    try {
        const attendanceRegister = await Attendance.find({ teacherId: req.user.profile._id })
        return {attendanceRegister}
    } catch (error) {
        console.log(error)
        return {error}
    }
}



const createNewPage = async(req, res ) => {
    try {
        const subject = await Subjects.findOne({ subjectId: req.params.subjectId })
        const newPage = new Attendance({
            attendance: [],
            subjectId: subject.subjectId,
            courseId: subject.courseId,
            collegeId: req.user.profile.collegeId,
            teacherName: req.user.profile.name,
            teacherId: req.user.profile._id
        })
        const {students, error} = await getStudentBySubjectId(req, res);
        if(error){
            throw("ERror")
        } else {
            for(let i = 0; i < students.length; i++){
                newPage.attendance.push({
                    name: students[i].name,
                    enrollNumber: students[i].enrollmentNumber,
                    attendance: 'N'
                })
            }
        }
        await newPage.save()
        return res.status(200).json({
            code: 200,
            pageId: newPage.pageId
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            code: 500, error
        })
    }
}


const markStudentAsPresent = async(req, res) => {
    try {
        const attendancePage = await Attendance.findOne({ pageId: req.params.pageId })
        let newAttendance = req.body.attendancePage
        const updateAttendancePage = await Attendance.findOneAndUpdate(
            {
                pageId: req.params.pageId
            },
            {
                $set: {
                    attendance: newAttendance
                }
            }
        )
        return res.status(200).json({
            code: 200,
            message: "updated attendance"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            code: 500, error
        })
    }
}


const attendanceCountBySubjectId = async(req) => {
    try {
        const studentId = req.params.studentId
        const studentProfile = await StudentProfile.findOne({ enrollmentNumber: studentId })
        const subjects = await Subjects.find({ sem: studentProfile.course.sem, courseId: studentProfile.course.courseId, collegeId: req.params.collegeId })
        // console.log(subjects)
        req.classes = []
        const studentAttendanceBySubjectId = await Attendance.aggregate([
            {
                $match: {
                    attendance: {$elemMatch: { enrollNumber: studentId, attendance: "P" }},
                    collegeId: req.params.collegeId
                } 
            },
            {
                $group: {
                    _id: "$subjectId",
                    totalClassesAttended: { $sum: 1 }
                }
            }
        ])

        // const studentAttendance = await Attendance.find({ attendance: {$elemMatch: { enrollNumber: studentId }} })
        
        const classesBySubjectId = await Attendance.aggregate([
            {
                $match: {
                    attendance: {$elemMatch: { enrollNumber: studentId }},
                    collegeId: req.params.collegeId
                }
            },
            {
                $group: {
                    _id: "$subjectId",
                    totalClasses: { $sum: 1 }
                }
            }
        ])
        
        // console.log(studentAttendanceBySubjectId)
        return {
            code: 200,
            message: "Route In development",
            classes: classesBySubjectId,
            attendance: studentAttendanceBySubjectId
        }
    } catch (error) {
        throw error;
    }
}



module.exports = {
    createNewPage,
    getAttendanceRegister,
    markStudentAsPresent,
    getAttendanceRegisterBySubjectId,
    getAttendanceRegisterByTeacher,
    attendanceCountBySubjectId
}


