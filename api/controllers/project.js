const Project = require('../models/project')
const Post = require('../models/post')

const projectController = {
    create: async (req, res) => {
        const project = new Project(req.body)
        await project.save()
        res.status(201).json(project)
    },
    readAll: async (req, res) => {
        const projects = await Project.find({})
        res.status(200).json(projects)
    },
    readOne: async (req, res) => {
        const { id } = req.params
        const project = await Project.findById(id)
        res.status(200).json(project)
    },
    update: async (req, res) => {
        const { id } = req.params
        await Project.findByIdAndUpdate(
            id,
            req.body,
            { new: true },
            (err, updatedProject) => {
                err ? res.status(500).send(err) : res.status(200).send(updatedProject)
            }
        )
    },
    delete: async (req, res) => {
        const { id } = req.params
        
        await Project.findByIdAndDelete(id, err => {
            if (err) {
                res.status(500).send(err)
            } else {
                
                // Delete all Posts related to the project
                Post.deleteMany({project: id}, (err, data) => {
                    if (err) {
                        res
                            .status(200)
                            .json({
                                success:
                              'You are successfuly deleted the project but an error occured while deleting posts'
                            })
                    } else {
                        res
                            .status(200)
                            .json({
                                success:
                              'You are successfuly deleted the project and ' +
                              data.deletedCount +
                              ' posts'
                            })
                    }
                })
            }
        })
    }
}

module.exports = projectController