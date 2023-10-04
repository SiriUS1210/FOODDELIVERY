if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

// Global variable
global.name=''

// Importing modules
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const path = require('path')
const mongoose = require('mongoose')  // Added Mongoose import
const expressLayouts = require('express-ejs-layouts')
const bodyparser = require('body-parser')
const methodOverride = require('method-override')

// Router initialization  
const indexrouter = require('./routes/index')
const registerloginrouter = require('./routes/registerlogin')
const adminrouter = require('./routes/admin')
const homerouter = require('./routes/home')

const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(methodOverride('_method'))
app.use(expressLayouts)
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyparser.urlencoded({ limit: '100mb', extended: false }))
app.use(cookieParser())

// Creating session
app.use(session({
    secret: 'bazingabongs',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10000000,
        secure: false,
        sameSite: 'strict'
    }
}));

// Database connection
const dbUrl = 'mongodb+srv://ishanmishra1080:Ishan1210@cluster0.sjqzk5b.mongodb.net/'  // Replace with your actual MongoDB URL
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection
db.on('error', error => console.error('MongoDB connection error:', error))
db.once('open', () => console.log('Connected to MongoDB'))

// Using routers
app.use('/', indexrouter)
app.use('/registerlogin', registerloginrouter)
app.use('/home', homerouter)
app.use('/admin', adminrouter)

// Start the server
app.listen(process.env.PORT || 27017, () => {
    console.log(`Server is running on port ${process.env.PORT ||27017}`)
});
