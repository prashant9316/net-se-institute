const router = require('express').Router()


router.get('/login/:collegeId', async(req, res) => {
    
    return res.render('teachers/login')
})


router.get('/dashboard', async(req, res) => {
    return res.render('teachers/dashboard')
})


router.get('/')

module.exports = router
