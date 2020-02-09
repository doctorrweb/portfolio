const express = require('express')
const clientController = require('../controllers/client')
require('../authentication/jwtAuth')

const passport = require('passport')

const jwtAuthentication = passport.authenticate('jwt', { session: false })

const clientRouter = express.Router()

clientRouter.route('/clients')
    .get(jwtAuthentication, clientController.readAll)
    .post(jwtAuthentication, clientController.create)

clientRouter.route('/clients/:id')
    .get(jwtAuthentication, clientController.readOne)
    .put(jwtAuthentication, clientController.update)
    .delete(jwtAuthentication, clientController.delete)

module.exports = clientRouter    