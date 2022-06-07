const Subjects = require('./../models/org/subjects')
const Class = require('./../models/org/class')
const Announcement = require('./../models/dashboard/announcements')
const Assignments = require('./../models/dashboard/assignments')
const Chatroom = require('./../models/dashboard/chatroom')
const Notes = require('./../models/dashboard/notes')
const Papers = require('./../models/dashboard/papers')
const Results = require('./../models/dashboard/results')
const Syllabus = require('./../models/dashboard/syllabus')





const getAllAssetsForSubjectWithIdService = async(req) => {
    try {
        const subject = await Subjects.findOne({ subjectId: req.params.subjectId })
        const announcements = await Announcement.find({ subjectId: req.params.subjectId })
        const notes = await Notes.find({ subjectId: req.params.subjectId })
        const syllabus = await Syllabus.findOne({ subjectId: req.params.subjectId })
        const papers = await Papers.find({ subjectId: req.params.subjectId })
        const assignments = await Assignments.find({ subjectId: req.params.subjectId })
        console.log(assignments)
        return { subject, announcements, notes, syllabus, papers, assignments, error: ''}
    } catch (error) {
        console.log(error)
        return {announcements: '', notes:[], syllabus: '', error}
    }
}




//////////////////////////////////////////////////////////
////////////////// NOTES ////////////////////////////////
//////////////////////////////////////////////////////////


const getNotes = async(req, res) => {
    try {
        const notes = await Notes.find({ subjectId: req.params.subjectId })
        return res.status(200).json({
            code: 200,
            notes
        })
    } catch (error) {
        return res.status(500).json({
            code: 500, error
        })
    }
}


const addNotes = async(req, res) => {
    try {
        const subject = await Subjects.findOne({ subjectId: req.params.subjectId })
        const newNote = new Notes({
            noteTitle: req.body.title,
            pdfLink: req.body.link,
            subjectId: subject.subjectId,
            courseId: subject.courseId,
            collegeId: req.user.collegeId,
            uploaderDetails: {
                name: req.user.profile.name
            }
        })
        await newNote.save()
        return res.status(200).json({
            code: 200,
            message: "successfully Added New Note to Subject!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            code: 500, error
        })
    }
}


const removeNotes = async(req, res) => {
    try {
        const notes = await Notes.findOneAndDelete({ noteId: req.params.noteId })
        return res.status(200).json({ code: 200, message: "Successfully Deleted!" })
    } catch (error) {
        return res.status(500).json({
            code: 500, error
        })
    }
}


const updateNotes = async(req, res) => {
    try {
        const updatedNotes = await Notes.findOneAndUpdate(
            {
                noteId: req.params.noteId
            }, 
            {
                $set: req.body
            }
        )
        return res.status(200).json({ code: 200, message: "Updated Notes!" })
    } catch (error) {
        return res.status(500).json({
            code: 500, error
        })
    }
}







//////////////////////////////////////////////////////////
////////////////// ASSIGNMENTS ///////////////////////////
//////////////////////////////////////////////////////////


const getAssign = async(req, res) => {
    try {
        const assignments = await Assignments.find({ subjectId: req.params.subjectId })
        return res.status(200).json({
            code: 200,
            assignments
        })
    } catch (error) {
        return res.status(500).json({
            code: 500, error
        })
    }
}


const addAssign = async(req, res) => {
    try {
        const subject = await Subjects.findOne({ subjectId: req.params.subjectId })
        const newNote = new Assignments({
            assignmentTitle: req.body.title,
            pdfLink: req.body.link,
            subjectId: subject.subjectId,
            courseId: subject.courseId,
            collegeId: req.user.collegeId,
            uploaderDetails: {
                name: req.user.profile.name
            }
        })
        await newNote.save()
        return res.status(200).json({
            code: 200,
            message: "successfully Added New Assignment to Subject!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            code: 500, error
        })
    }
}


const removeAssign = async(req, res) => {
    try {
        const notes = await Assignments.findOneAndDelete({ noteId: req.params.noteId })
        return res.status(200).json({ code: 200, message: "Successfully Deleted Assignment!" })
    } catch (error) {
        return res.status(500).json({
            code: 500, error
        })
    }
}


const updateAssign = async(req, res) => {
    try {
        const updatedNotes = await Assignments.findOneAndUpdate(
            {
                noteId: req.params.noteId
            }, 
            {
                $set: req.body
            }
        )
        return res.status(200).json({ code: 200, message: "Updated Assignment!" })
    } catch (error) {
        return res.status(500).json({
            code: 500, error
        })
    }
}






//////////////////////////////////////////////////////////
////////////////// SYLLABUS ////////////////////////////////
//////////////////////////////////////////////////////////


const getSyllabus = async(req, res) => {
    try {
        const syllabus = await Syllabus.find({ subjectId: req.params.subjectId })
        return res.status(200).json({
            code: 200,
            syllabus
        })
    } catch (error) {
        return res.status(500).json({
            code: 500, error
        })
    }
}


const addSyllabus = async(req, res) => {
    try {
        const subject = await Subjects.findOne({ subjectId: req.params.subjectId })
        const syllabus = await Syllabus.findOne({ subjectId: req.params.subjectId })
        if(syllabus){
            const updatedNotes = await Syllabus.findOneAndUpdate(
                {
                    subjectId: req.params.subjectId
                }, 
                {
                    $set: req.body
                }
            )
        } else {
            const newNote = new Syllabus({
                syllabusTitle: req.body.title,
                pdfLink: req.body.link,
                subjectId: subject.subjectId,
                courseId: subject.courseId,
                collegeId: req.user.collegeId,
            })
            await newNote.save()
        }
        
        return res.status(200).json({
            code: 200,
            message: "successfully Syllabus Updated!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            code: 500, error
        })
    }
}


const removeSyllabus = async(req, res) => {
    try {
        const notes = await Syllabus.findOneAndDelete({ subjectId: req.params.subjectId })
        return res.status(200).json({ code: 200, message: "Successfully Deleted!" })
    } catch (error) {
        return res.status(500).json({
            code: 500, error
        })
    }
}


const updateSyllabus = async(req, res) => {
    try {
        const updatedNotes = await Syllabus.findOneAndUpdate(
            {
                subjectId: req.params.subjectId
            }, 
            {
                $set: req.body
            }
        )
        return res.status(200).json({ code: 200, message: "Updated Notes!" })
    } catch (error) {
        return res.status(500).json({
            code: 500, error
        })
    }
}







//////////////////////////////////////////////////////////
////////////////// PAPER ////////////////////////////////
//////////////////////////////////////////////////////////


const getPapers = async(req, res) => {
    try {
        const syllabus = await Papers.find({ subjectId: req.params.subjectId })
        return res.status(200).json({
            code: 200,
            syllabus
        })
    } catch (error) {
        return res.status(500).json({
            code: 500, error
        })
    }
}


const addPaper = async(req, res) => {
    try {
        const subject = await Subjects.findOne({ subjectId: req.params.subjectId })
        
        const newNote = new Papers({
            paperTitle: req.body.title,
            paperYear: req.body.paperYear,
            pdfLink: req.body.link,
            subjectId: subject.subjectId,
            courseId: subject.courseId,
            collegeId: req.user.collegeId,
        })
        await newNote.save()
        
        
        return res.status(200).json({
            code: 200,
            message: "successfully Paper Added!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            code: 500, error
        })
    }
}


const removePaper = async(req, res) => {
    try {
        const notes = await Papers.findOneAndDelete({ paperId: req.params.paperId })
        return res.status(200).json({ code: 200, message: "Successfully Deleted!" })
    } catch (error) {
        return res.status(500).json({
            code: 500, error
        })
    }
}


const updatePaper = async(req, res) => {
    try {
        const updatedNotes = await Papers.findOneAndUpdate(
            {
                paperId: req.params.paperId
            }, 
            {
                $set: req.body
            }
        )
        return res.status(200).json({ code: 200, message: "Updated Paper!" })
    } catch (error) {
        return res.status(500).json({
            code: 500, error
        })
    }
}






//////////////////////////////////////////////////////////
////////////////// PAPER ////////////////////////////////
//////////////////////////////////////////////////////////



const addAnnouncement = async(req, res) => {
    try {
        const subject = await Subjects.findOne({ subjectId: req.params.subjectId })
        
        const newNote = new Announcement({
            title: req.body.title,
            announcement: req.body.announcement,
            announcementBy: req.user.profile.name,
            subjectId: subject.subjectId,
            courseId: subject.courseId,
            collegeId: req.user.collegeId,
        })
        await newNote.save()
        
        
        return res.status(200).json({
            code: 200,
            message: "successfully Created Announcement!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            code: 500, error
        })
    }
}





module.exports = {
    getAllAssetsForSubjectWithIdService,
    getNotes,
    addNotes, 
    removeNotes,
    updateNotes,
    updateAssign,
    removeAssign,
    getAssign,
    addAssign,
    updateSyllabus,
    removeSyllabus,
    getSyllabus,
    addSyllabus,
    updatePaper,
    removePaper,
    getPapers,
    addPaper,
    addAnnouncement
}




