const Comment = require('../models/comment')

const commentController = {
    new: async (req, res) => {
        const comment = new Comment(req.body)
        await comment.save()
        res.status(201).json(comment)
    },
    getAll: async (req, res) => {
        const comments = await Comment.find({})
        res.status(200).json(comments)
    },
    getOne: async (req, res) => {
        const { id } = req.params
        const comment = await Comment.findById(id)
        res.status(200).json(comment)
    },
    update: async (req, res) => {
        const { id } = req.params
        await Comment.findByIdAndUpdate(
            id,
            req.body,
            { new: true },
            (err, updatedComment) => {
                err ? res.status(500).send(err) : res.status(200).send(updatedComment)
            }
        )
    },
    delete: async (req, res) => {
        const { id } = req.params
        await Comment.findByIdAndDelete(id, err => {
            err ? res.status(500).send(err) : res.status(200).json({ success: true })
        })
    }
}

module.exports = commentController