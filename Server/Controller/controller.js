const {User} = require('../Model/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const sign = process.env.JWTSIGN

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

module.exports.createToken = (id)=>{
    const token = jwt.sign({id}, sign, {expiresIn: 60*60*24*3})
    return token
}

module.exports.login = async (req, res)=>{
    console.log(req)
    let {email, password} = req.body
    console.log(email, password)

    try{
        const user = await User.login(email, password)
        console.log(user, sign)
        const token = createToken(user._id)
        res.status(200).json({user, token})
    }
    catch(err){
        console.log(err)
        res.status(400).json({error: handleError(err)})
    }
}

module.exports.signup = async (req, res)=>{
    const {email, password, firstName, middleName, lastname, birthday, gender, idNumber} = req.body

    try{
        const user = await User.create({email, password, firstName, middleName, lastname, birthday, gender, idNumber})
        const token = createToken(user._id)
        res.status(200).send({user, token})
    }
    catch(err){
        res.status(400).json(handleError(err))
    }
}


