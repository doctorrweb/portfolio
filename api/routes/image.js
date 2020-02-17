const express = require('express')
const imageController = require('../controllers/image')

require('../authentication/jwtAuth')

const passport = require('passport')
const jwtAuthentication = passport.authenticate('jwt', { session: false })

const imageRouter = express.Router()

imageRouter.route('/images')
    .post(jwtAuthentication, imageController.create)
    .get(jwtAuthentication, imageController.readAll)

imageRouter.route('/images/:id')
    .get(jwtAuthentication, imageController.readOne)
    .put(jwtAuthentication, imageController.update)
    .delete(jwtAuthentication, imageController.delete)

module.exports = imageRouter