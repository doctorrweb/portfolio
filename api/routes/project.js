const express = require('express')
const projectController = require('../controllers/project')

const projectRouter = express.Router()

projectRouter.route('/projects')
    .get(projectController.getPosts)

projectRouter.route('/projects/:id')
    .get(projectController.gePost)


module.exports = projectController    