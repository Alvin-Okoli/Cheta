const {User} = require('../Model/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
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

const createToken = (id)=>{
    const token = jwt.sign({id}, secret, {expiresIn: 60*60*24*3})
    return token
}

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

module.exports.signup = async (req, res)=>{
    let {email, password, firstName, middleName, lastname, birthday, gender, idNumber} = req.body

    try{
        let user = await User.create({email, password, firstName, middleName, lastname, birthday, gender, idNumber})
        const token = createToken(user._id)
        user = user.toObject({getters: true, password: false, _id: false})
        res.status(200).send({user, token})
    }
    catch(err){
        res.status(400).json(handleError(err))
    }
}

module.exports.getUser = async (req, res) =>{
    let tokens = req.params.token
    console.log('received user request from jwt token')

    try{
        let id = jwt.verify(tokens, secret)
        let user = await User.findById(id.id)
        if(!user){
            return res.status(404).json({error: 'user not found'})
        }
        res.status(200).json({user})
    }
    catch(err){
        res.status(500).json({error: 'internal server error'})
    }
} 

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
