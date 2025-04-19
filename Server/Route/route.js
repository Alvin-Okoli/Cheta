const {Router} = require('express')
const controller = require('../Controller/controller')
const route = Router()

route.post('/login', controller.login)
route.post('/signup', controller.signup)

module.exports = route