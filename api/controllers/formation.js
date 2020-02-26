const Formation = require('../models/formation')
const Post = require('../models/post')
const Comment = require('../models/comment')

const formationController = {
    create: async (req, res) => {
        try {
            const formation = new Formation(req.body)
            await formation.save()
            res.status(200).json(formation)

        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readAll: async (req, res) => {
        try {
            const formation = await Formation.find({})
            res.status(200).json(formation)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readOne: async (req, res) => {
        try {
            const { id } = req.params
            const formation = await Formation.findById(id)
            res.status(200).json(formation)

        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            //const formation = await Formation.findById(id)

            await Formation.findByIdAndUpdate(
                id,
                req.body,
                { new: true },
                (err, updatedFormation) => {
                    err ? res.status(500).send(err) : res.status(200).json(updatedFormation)
                }
            )
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const formation = await Formation.findById(id)
            const response = {}

            // Delete the Formation
            await Formation.findByIdAndDelete(id, err => {
                err ? res.status(500).send(err) : Object.assign(response, { formation: 1})
            })

            if (formation.posts !== []) {

                // Delete posts related to the formation
                await Post.deleteMany({ formation: id }, (err, data) => {
                    err ? res.status(500).send(err) : Object.assign(response, { posts: data.n })
                })

                // Delete comments related to posts linked to the formation
                const commentsOfPosts = await Comment.find({ post: formation.posts })
                if (commentsOfPosts) {
                    const postIdOfComments = []
                    commentsOfPosts.map(item => {
                        postIdOfComments.push(item.post)
                    })

                    await Comment.deleteMany({ post: { $in: postIdOfComments } }, (err, data) => {
                        Object.assign(response, { comments: data.n, success: true })
                        err ? res.status(500).send(err) : res.status(200).json(response)
                    })
                }
            }

        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
        
    }
}

module.exports = formationController