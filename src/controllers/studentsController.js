const StudentsProfile = require('./../models/studentProfile')



const setSem = async(req, res) => {
    try {
        const students = await StudentsProfile.find({})
        
        for(let i = 0; i < students.length; i ++){
            let sem = 1; 
            // console.log(students[i].emailId)
            if(students[i].course.currentYear == 1){
                sem = 2;
            } else if(students[i].course.currentYear == 2){
                sem = 4;
            } else if(students[i].course.currentYear == 3){
                sem = 6;
            } else {
                sem = 8;
            }
            // console.log(sem)
            // let course = students[i].course
            course = {
                sem: sem
            }
            console.log(course)
            await StudentsProfile.findOneAndUpdate({ emailId: students[i].emailId}, {
                $set: {
                    "course.sem": sem
                }
            })
        }
        return res.send("done bitches!")
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error
        })
    }
}


const getAllStudentsByCollegeService = async(req) => {
    try {
        console.log(req.user)
        const students = await StudentsProfile.find({ collegeId: req.user.collegeId.toUpperCase() })
        if(!students){
            return []
        }
        return students
    } catch (error) {
        console.log("Students Controller: "+error)
        return res.status(500).json({
            code: 500,
            error
        })
    }
}



const getStudentByCourseIdAndCollegeService = async(req) => {
    try {
        const students = await StudentsProfile.find({ collegeId: req.user.collegeId.toUpperCase(), "course.courseId": req.params.courseId  })
        return students
    } catch (error) {
        console.log("Students Controller: "+error)
        return res.status(500).json({
            code: 500,
            error
        })
    }
}


const getAllStudentsByCollege = async(req, res) => {
    try {
        const students = await StudentsProfile.find({})
        if(!students){
            return res.status(200).json({
                students: [],
                code: 200
            })
        }
        return res.status(200).json({
            students,
            code: 200
        })
    } catch (error) {
        console.log("Students Controller: "+error)
        return res.status(500).json({
            code: 500,
            error
        })
    }
}


const getStudentProfile = async(req, res) => {
    try {
        const student = await StudentsProfile.findOne({ enrollmentNumber: req.params.studentId })
        return {student, error: ''}
    } catch (error) {
        return {error}
    }
}



module.exports = {
    getAllStudentsByCollege,
    getAllStudentsByCollegeService,
    getStudentByCourseIdAndCollegeService,
    getStudentProfile,
    setSem
}