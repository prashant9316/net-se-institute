const Courses = require('./../models/org/courses')
const Subjects = require('./../models/org/subjects')


const addNewCourse = async(req, res) => {
    try {
        const newCourse = new Courses({
            courseName: req.body.courseName,
            collegeId: req.body.collegeId,
            courseDuration: req.body.courseDuration
        })

        await newCourse.save()
        return res.json({
            code: 200,
            message: "New Course Added"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}



const addNewSubject = async(req, res) => {
    try {
        console.log(req.user)
        const newSubject = new Subjects({
            subjectName: req.body.subjectName,
            subjectId: req.body.subjectId,
            courseId: req.body.courseId,
            sem: req.body.sem,
            year: req.body.year,
            collegeId: req.body.collegeId
        })
        await newSubject.save();
        return res.json({
            code: 200,
            message: "New Subject Added!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}

module.exports = {
    addNewCourse,
    addNewSubject
}