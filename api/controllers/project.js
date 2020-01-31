const Project = require('../models/project')

const projectController = {
    new: async (req, res) => {
        const project = new Project(req.body)
        await project.save()
        res.status(201).json(project)
    },
    getAll: async (req, res) => {
        const projects = await Project.find({})
        res.status(200).json(projects)
    },
    getOne: async (req, res) => {
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
            err ? res.status(500).send(err) : res.status(200).json({ success: true })
        })
    }
}

module.exports = projectController