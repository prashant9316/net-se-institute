require('dotenv').config()

const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')
const path = require('path')

const corsOption = {
    origin: "*", 
    methods: [
        'GET', 
        'POST'
    ]
}

const app = express()


app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(logger('dev'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"))


app.use(cors(corsOption))


mongoose.connect(process.env.DATABASE_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log("connected to db")    
)

const AdminIndexRouter = require('./src/vroutes/admin')
const AdminAuthRouter = require('./src/routes/adminAuth')
const AdminTeacherRouter = require('./src/routes/adminTeacherRouter')



const TeacherIndexRouter = require('./src/vroutes/teacher')
const TeacherAuthRouter = require('./src/routes/teachersAuth')
const TeacherSubjectApiRouter = require('./src/routes/subjectApi')
const AttendanceApiRouter = require('./src/routes/attendanceApi')

const MainAdminIndexRouter = require('./src/vroutes/mainadmin')


app.get('/', async(req, res) => {
    return res.render("main-page")
})

app.get('/new-college', async(req, res) => {
    return res.render('new-college')
})


const dataDesc = {
    "key1": "In-store PCI", 
    "key2": "Out-store PCI",
    "key3": "Product Advertised Range Limit",
    "key4": "Reactance Time",
    "key5": "Product Purchased?",
    "key6": "Priced Promotion?",
    "key7": "Same Product Purchased or Other"
}

app.post('/api/v1/datasets/trial', async(req, res) =>{
    return res.json({
        code: 200,
        dataDesc
    })
})

app.use('/main-admin', MainAdminIndexRouter)



app.use('/admin', AdminIndexRouter)
app.use('/admin', AdminAuthRouter)
app.use('/admin', AdminTeacherRouter)


app.use('/teacher', TeacherIndexRouter)
app.use('/teacher', TeacherAuthRouter)
app.use('/teacher', TeacherSubjectApiRouter)
app.use('/teacher', AttendanceApiRouter)




app.listen(process.env.PORT , () => {
    console.log(`Open Admin panel on: http://${process.env.HOST}:${process.env.PORT}`)
})