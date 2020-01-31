const express = require('express')
const commentController = require('../controllers/comment')
require('../authentication/jwtAuth')

const passport = require('passport')

const jwtAuthentication = passport.authenticate('jwt', { session: false })

const commentRouter = express.Router()

commentRouter.route('/comments')
    .get(jwtAuthentication, commentController.getAll)
    .post(jwtAuthentication, commentController.new)

commentRouter.route('/comments/:id')
    .get(jwtAuthentication, commentController.getOne)
    .put(jwtAuthentication, commentController.update)
    .delete(jwtAuthentication, commentController.delete)



module.exports = commentRouter    