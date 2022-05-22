const router = require('express').Router()
const Colleges = require('./../models/org/colleges')

const { verifyTeacher } = require('../services/verifyJwt')



router.get('/login/:collegeId', async(req, res) => {
    const college = await Colleges.findOne({ collegeId: req.params.collegeId })
    if(!college){
        return res.redirect('/')
    } 
    return res.render('teachers/login', {
        college
    })
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


router.get('/')

module.exports = router
