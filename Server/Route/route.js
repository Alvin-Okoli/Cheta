const {Router} = require('express')
const controller = require('../Controller/controller')
const route = Router()

route.post('/login', controller.login)
route.post('/signup', controller.signup)
route.get('/user/:token', controller.getUser)
route.put('/update/:user', controller.editProfile)

module.exports = route