const Client = require('../models/client')
const Project = require('../models/project')

const clientController = {
    create: async (req, res) => {
        const client = new Client(req.body)
        await client.save()
        res.status(201).json(client)
    },
    readAll: async (req, res) => {
        const clients = await Client.find({})
        res.status(200).json(clients)
    },
    readOne: async (req, res) => {
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
        //const client = Client.findById(id)

        await Client.findByIdAndDelete(id, err => {
            if (err) {
                res.status(500).send(err)
            } else {
                // Delete all projects related to the Client
                //Project.findByIdAndDelete(client.Project)
                Project.deleteMany({client: id}, (err, data) => {
                    console.log(data)
                    if (err) {
                        res
                            .status(200)
                            .json({
                                success:
                              'You are successfuly deleted the clien but an error occured while deleting related projects'
                            })
                    } else {
                        res.status(200).json({success: 'You are successfuly deleted the client and ' + data.deleteCount + ' projects'})
                    }
                })
            }
            
        })
    }
}

module.exports = clientController