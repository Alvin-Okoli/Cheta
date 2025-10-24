const {Router} = require('express')
const controller = require('../Controller/controller')
const route = Router()

route.post('/login', controller.login)
route.post('/signup', controller.signup)
route.get('/user/:token', controller.getUser)//get user by token
route.put('/update/:user', controller.editProfile)
route.post('/getOtp', controller.getOTP)//generate send otp to email
route.post('/verify', controller.verifyOTP)

module.exports = route