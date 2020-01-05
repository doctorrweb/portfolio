const postController = {
    getPosts: async (req, res) => {
        res.send('List of all users!')
    },
    gePost: async (req, res) => {
        res.send(`Information about user ${req.params.id}`)
    }
}

module.exports = postController