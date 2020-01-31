/*
module.exports = (app) => {
    app.get('/', function (req, res) {
        res.send('Hello World who works properly!')
    })
}
*/

const express = require('express')

const userRouter = require('./user')
const postRouter = require('./post')
const projectRouter = require('./project')
const commentRouter = require('./comment')

const appRouter = express.Router()

appRouter.use(userRouter)
appRouter.use(postRouter)
appRouter.use(projectRouter)
appRouter.use(commentRouter)

module.exports = appRouter