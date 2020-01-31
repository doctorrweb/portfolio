const express = require('express')
const postController = require('../controllers/post')
require('../authentication/jwtAuth')

const passport = require('passport')

const jwtAuthentication = passport.authenticate('jwt', { session: false })

const postRouter = express.Router()

postRouter.route('/posts')
    .get(jwtAuthentication, postController.getAll)

postRouter.route('/posts/:id')
    .get(jwtAuthentication, postController.getOne)
    .put(jwtAuthentication, postController.update)
    .delete(jwtAuthentication, postController.delete)    


module.exports = postRouter    