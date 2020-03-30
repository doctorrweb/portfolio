const express = require('express')
const postController = require('../controllers/post')
require('../authentication/jwtAuth')
const authorize = require('../authentication/authorization')

const passport = require('passport')

const jwtAuthentication = passport.authenticate('jwt', { session: false })

const postRouter = express.Router()

postRouter.route('/posts')
    .get(postController.readAll)
    .post(jwtAuthentication, authorize('manager', 'administrator'), postController.create)

postRouter.route('/posts/:id')
    .get(jwtAuthentication, postController.readOne)
    .put(jwtAuthentication, authorize('manager', 'administrator'), postController.update)
    .delete(jwtAuthentication, authorize('manager', 'administrator'), postController.delete)    


module.exports = postRouter
