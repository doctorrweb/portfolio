const express = require('express')
const formationController = require('../controllers/formation')
require('../authentication/jwtAuth')

const passport = require('passport')
const jwtAuthentication = passport.authenticate('jwt', { session: false })

const formationRouter = express.Router()

formationRouter.route('/formations')
    .post(jwtAuthentication, formationController.create)
    .get(jwtAuthentication, formationController.readAll)

formationRouter.route('/formations/:id')
    .get(jwtAuthentication, formationController.readOne)
    .put(jwtAuthentication, formationController.update)
    .delete(jwtAuthentication, formationController.delete)
    
module.exports = formationRouter    