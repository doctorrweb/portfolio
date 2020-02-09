const Post = require('../models/post')
const Comment = require('../models/comment')
const Project = require('../models/project')

const postController = {
    new: async (req, res) => {
        const post = new Post(req.body)
        await post.save()

        
        //Link the post to the related project
        if (post.project) {
            const project = await Project.findById(post.project)
            await project.posts.push(post._id)
            await project.save()
        }
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
        const post = Post.findById(id)

        const oldProject = Project.findById(post.project)
        const projectPosts = oldProject.posts.filter(post => post != id)

        await Post.findByIdAndUpdate(
            id,
            req.body,
            { new: true },
            (err, updatedPost) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    if (req.body.project && (req.body.project !== post.project)) {
                        
                        //Delete the post in the old project
                        oldProject.posts = projectPosts
                        oldProject.save()

                        //Add the post in the new project
                        const newProject = Project.findById(updatedPost.project)
                        newProject.posts.push(updatedPost._id)
                        newProject.save()
                    }
                    res.status(200).send(updatedPost)
                }
            }
        )
    },
    delete: async (req, res) => {
        const { id } = req.params
        const post = Post.findById(id)
        const project = Project.findById(post._id)
        const projectPosts = project.posts.filter(post => post != id)

        await Post.findByIdAndDelete(id, err => {
            if (err) {
                res.status(500).send(err)
            } else {

                // Remove the post from the related project
                project.posts = projectPosts
                project.save()

                // Delete all comments related to the article
                Comment.deleteMany({ post: id }, (err, data) => {
                    if (err) {
                        res.status(200).json({ success: 'You are successfuly deleted the article but an error occured while deleting comments' })
                    } else {
                        res.status(200).json({ success: 'You are successfuly deleted the article and ' + data.deletedCount + ' comments' })
                    }
                })
                
                
            }
        })
    }
}

module.exports = postController