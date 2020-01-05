const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

userRouter.route('/users')
    .get(userController.getUsers)

userRouter.route('/users/:id')
    .get(userController.getUser)


module.exports = userRouter    