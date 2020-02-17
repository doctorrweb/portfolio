const Comment = require('../models/comment')
const Post = require('../models/post')

const commentController = {
    create: async (req, res) => {
        try {
            const comment = new Comment(req.body)
            await comment.save()

            //Link the comment to the related post
            const post = await Post.findById(comment.post)
            await post.comments.push(comment._id)
            await post.save()

            // Send the response to the client
            res.status(201).json(comment)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readAll: async (req, res) => {
        try {
            const comments = await Comment.find({})
            res.status(200).json(comments)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readOne: async (req, res) => {
        try {
            const { id } = req.params
            const comment = await Comment.findById(id)
            res.status(200).json(comment)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            await Comment.findByIdAndUpdate(
                id,
                req.body,
                { new: true },
                (err, updatedComment) => {
                    err ? res.status(500).send(err) : res.status(200).send(updatedComment)
                }
            )
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const comment = await Comment.findById(id)

            const post = await Post.findById(comment.post)
            const postComments = post.comments.filter(comment => comment != id)

            await Comment.findByIdAndDelete(id, err => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    //Delete the comment in the related post
                    post.comments = postComments
                    post.save()

                    // Send the response to the client
                    res.status(200).json({ success: true })
                }
            })
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    }
}

module.exports = commentController