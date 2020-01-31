const Post = require('../models/post')

const postController = {
    new: async (req, res) => {
        const post = new Post(req.body)
        await post.save()
        res.status(201).json(post)
    },
    getAll: async (req, res) => {
        const posts = await Post.find({})
        res.status(200).json(posts)
    },
    getOne: async (req, res) => {
        const { id } = req.params
        const post = await Post.findById(id)
        res.status(200).json(post)
    },
    update: async (req, res) => {
        const { id } = req.params
        await Post.findByIdAndUpdate(
            id,
            req.body,
            { new: true },
            (err, updatedPost) => {
                err ? res.status(500).send(err) : res.status(200).send(updatedPost)
            }
        )
    },
    delete: async (req, res) => {
        const { id } = req.params
        await Post.findByIdAndDelete(id, err => {
            err ? res.status(500).send(err) : res.status(200).json({ success: true })
        })
    }
}

module.exports = postController