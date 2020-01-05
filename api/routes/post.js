const express = require('express')
const postController = require('../controllers/post')

const postRouter = express.Router()

postRouter.route('/posts')
    .get(postController.getPosts)

postRouter.route('/posts/:id')
    .get(postController.gePost)


module.exports = postRouter    