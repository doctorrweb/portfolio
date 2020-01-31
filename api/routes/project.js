const express = require('express')
const projectController = require('../controllers/project')
require('../authentication/jwtAuth')

const passport = require('passport')

const jwtAuthentication = passport.authenticate('jwt', { session: false })

const projectRouter = express.Router()

projectRouter.route('/projects')
    .get(jwtAuthentication, projectController.getAll) 
    .post(jwtAuthentication, projectController.new)

projectRouter.route('/projects/:id')
    .get(jwtAuthentication, projectController.getOne)
    .put(jwtAuthentication, projectController.update)
    .delete(jwtAuthentication, projectController.delete)

module.exports = projectRouter    