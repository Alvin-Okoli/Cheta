const {User} = require('../Model/user');
const {Otp} = require('../Model/OTP');
const sendEmail = require('../nodemailer')
const jwt = require('jsonwebtoken');

// Load environment variables
require('dotenv').config();
const secret = process.env.JWTSIGN

const handleError = (err)=>{
    let errors = {email: '', password: ''}

    if(err.message === 'incorrect email'){
        errors.email = 'this email is incorrect'
    }

    if(err.message === 'incorrect password'){
        errors.password = 'incorrect password'
    }

    if(err.code === 11000){
        errors.email = 'email already in use'
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
    return errors
}

// Creates JWT token
const createToken = (id)=>{
    const token = jwt.sign({id}, secret, {expiresIn: 60*60*24*3})
    return token
}

// Handles login logic
module.exports.login = async (req, res)=>{
    let {email, password} = req.body
    console.log(email, password)

    try{
        let user = await User.login(email, password)
        const token = createToken(user._id)
        user = user.toObject({getters: true, password: false, _id: false})
        res.status(200).json({user, token})
    }
    catch(err){
        console.log(err)
        res.status(400).json({error: handleError(err)})
    }
}

// Handles signup logic
module.exports.signup = async (req, res)=>{
    console.log(req.body)
    let {email, password, firstName, middleName, lastname, birthday, gender, idNumber} = req.body

    try{
        let user = await User.create({email, password, firstName, middleName, lastname, birthday, gender, idNumber})
        const token = createToken(user._id)
        user = user.toObject({getters: true, password: false, _id: false})
        res.status(200).send({user, token})
    }
    catch(err){
        console.log(err)
        res.status(400).json(handleError(err))
    }
}

// Handles automatic redirection
module.exports.getUser = async (req, res) =>{
    let token = req.params.token
    console.log('received user request from jwt token :', token)

    if(token === 'undefined'){
        return res.status(401).json({error: 'no token provided'})
    }

    try{
        let id = jwt.verify(token, secret)
        let user = await User.findById(id.id)
        if(!user){
            return res.status(404).json({error: 'user not found'})
        }
        res.status(200).json({user})
    }
    catch(err){
        console.log(err.message)

        if(err.name === 'JsonWebTokenError'){
            return res.status(401).json({error: 'invalid token'})
        }
        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({error: 'token expired'})
        }

        res.status(500).json({error: 'internal server error'})
    }
} 

// Handles profile update
module.exports.editProfile = async (req, res)=>{
    let id = req.params.user
    let update = req.body
    console.log(id, req.body)

    try{
        let user = await User.findOneAndUpdate({_id: id}, update, {new: true})
        console.log(user)
        if(!user){
            return res.status(404).json({error: 'user not found'})
        }
        res.status(200).json({user})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'internal server error'})
    }
}


//Handles OTP creation
module.exports.getOTP = async (req, res) => {
    const {email, channel} = req.body;
    console.log('OTP request for email:', email, 'via channel:', channel);
    try{
        const {otp} = await Otp.generateOtp(email, channel)
        const otpInfo = await sendEmail({
            to: email,
            subject: 'Your OTP Code',
            html: `<h3>Your OTP Code is: <h1>${otp}</h1> and is valid for 10 minutes.<h3>`,
            text: `Your OTP Code is: ${otp} and is valid for 10 minutes.`
        })
        res.status(200).json({message: 'OTP sent successfully', otp, otpInfo})
    }
    catch(err){
        console.error(err)
        res.status(500).json({error: 'Failed to generate OTP' })
    }
}

//Handles OTP verification
module.exports.verifyOTP = async (req, res) => {
    const {email, otp} = req.body;
    console.log('Verifying OTP for email:', email, ' with OTP:', otp);
    try{
        const result = await Otp.verifyOtp(email, otp)
        if(result.success){
            res.status(200).json({message: result.message})
        }else{
            res.status(400).json({error: result.message})
        }
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Failed to verify OTP' })
    }
}