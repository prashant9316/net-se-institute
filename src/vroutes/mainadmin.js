const router = require('express').Router()
const { 
    loginMainAdminRouter, 
    loginAuthMainAdmin, 
    indexRouterMainAdmin, 
    createNewCollegeId, 
    viewAllCollege, 
    formNewCollege,
    viewOneColleges,
    createAdminLoginCredentialsForCollegeAction,
    createAdminLoginCredentialsForCollegeForm
} = require('../controllers/mainAdminAuthController');
const MainAdminDB = require('./../models/mainAdmin')


const { verifyBaap, verifyLoginRedirect } = require('./../services/verifyJwt')

router.get('/:phoneNumber/login', 
    // verifyLoginRedirect, 
    loginMainAdminRouter)

router.post('/:phoneNumber/login', loginAuthMainAdmin)

router.get('/dashboard', verifyBaap, indexRouterMainAdmin)

router.get('/dashboard/institutes', verifyBaap, viewAllCollege)

router.get('/dashboard/new-institute', verifyBaap, createNewCollegeId)

router.post('/dashboard/new-institute', verifyBaap, formNewCollege)

router.get('/dashboard/institute/:collegeId', verifyBaap, viewOneColleges)

router.get('/dashboard/credentials/:collegeId', verifyBaap)

router.get('/dashboard/new-credentials/:collegeId', verifyBaap, createAdminLoginCredentialsForCollegeForm)

router.post('/dashboard/new-credentials/:collegeId', verifyBaap, createAdminLoginCredentialsForCollegeAction)

module.exports = router;