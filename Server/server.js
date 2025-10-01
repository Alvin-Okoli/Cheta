//dependencies
const express = require('express');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const route = require('./Route/route');
require('dotenv').config()
// const passport = require('./Oauth/passport');

//env keys and imports
const port = process.env.PORT || 3000
const mongoKey = process.env.MONGOKEY
const sessionSecret = process.env.SESSIONSECRET
const origin = process.env.ORIGIN

//middleware
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
// app.use(session({
//     secret: sessionSecret,
//     resave: false,
//     saveUninitialized: false
//   }));
// app.use(passport.initialize())
// app.use(passport.session())


//cors setup
app.use(cors({
    origin:'https://cheta-nine.vercel.app',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

mongoose.connect(mongoKey).then(()=>{
    console.log('db connected')
    }
).catch((err)=>{
    console.error('db connection errror:', err)
})

app.listen(port, ()=>{
    console.log(`Server is up and running on port: ${port}`)
})

app.get('/', (req, res)=>{
    res.status(200).json({name: 'Alvina😁'})
})

// app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), function(req, res){
//     console.log(req.user)
//     let user = req.user
//     res.status(200).json({user: user})
// })

app.use(route)
