const projectController = {
    getProjects: async (req, res) => {
        res.send('List of all users!')
    },
    getProject: async (req, res) => {
        res.send(`Information about user ${req.params.id}`)
    }
}

module.exports = projectController