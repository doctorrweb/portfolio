const express = require('express')
const clientController = require('../controllers/client')
require('../authentication/jwtAuth')

const passport = require('passport')

const jwtAuthentication = passport.authenticate('jwt', { session: false })

const clientRouter = express.Router()

clientRouter.route('/projects')
    .get(jwtAuthentication, clientController.getAll)
    .post(jwtAuthentication, clientController.new)

clientRouter.route('/projects/:id')
    .get(jwtAuthentication, clientController.getOne)
    .put(jwtAuthentication, clientController.update)
    .delete(jwtAuthentication, clientController.delete)

module.exports = clientRouter    