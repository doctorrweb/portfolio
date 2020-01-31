const Client = require('../models/project')

const clientController = {
    new: async (req, res) => {
        const client = new Client(req.body)
        await client.save()
        res.status(201).json(client)
    },
    getAll: async (req, res) => {
        const clients = await Client.find({})
        res.status(200).json(clients)
    },
    getOne: async (req, res) => {
        const { id } = req.params
        const client = await Client.findById(id)
        res.status(200).json(client)
    },
    update: async (req, res) => {
        const { id } = req.params
        await Client.findByIdAndUpdate(
            id,
            req.body,
            { new: true },
            (err, updatedClient) => {
                err ? res.status(500).send(err) : res.status(200).send(updatedClient)
            }
        )
    },
    delete: async (req, res) => {
        const { id } = req.params
        await Client.findByIdAndDelete(id, err => {
            err ? res.status(500).send(err) : res.status(200).json({ success: true })
        })
    }
}

module.exports = clientController