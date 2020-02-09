

const express = require('express')

const userRouter = require('./user')
const postRouter = require('./post')
const projectRouter = require('./project')
const commentRouter = require('./comment')
const clientRouter = require('./client')

const appRouter = express.Router()

appRouter.use(userRouter)
appRouter.use(postRouter)
appRouter.use(projectRouter)
appRouter.use(commentRouter)
appRouter.use(clientRouter)

module.exports = appRouter