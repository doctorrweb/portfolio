const userController = {
    getUsers: async (req, res) => {
        res.send('List of all users!')
    },
    getUser: async (req, res) => {
        res.send(`Information about user ${req.params.id}`)
    }
}

module.exports = userController