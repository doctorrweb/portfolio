const express = require('express')
const userController = require('../controllers/user')
require('../authentication/jwtAuth')
require('../authentication/localAuth')
const passport = require('passport')

const jwtAuthentication = passport.authenticate('jwt', { session: false })
const localAuthentication = passport.authenticate('local', { session: false })

const userRouter = express.Router()
userRouter.route('/signup')
    .post(userController.signUp)

userRouter.route('/signin')  
    .post(localAuthentication, userController.signIn)
    
userRouter.route('/users')
    .get(jwtAuthentication, userController.getAll)

userRouter.route('/users/:id')
    .get(jwtAuthentication, userController.getOne)
    .put(jwtAuthentication, userController.update)
    .delete(jwtAuthentication, userController.delete)

module.exports = userRouter    