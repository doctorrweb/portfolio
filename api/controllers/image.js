const Image = require('../models/image')


const imageController = {
    create: async (req, res) => {
        try {

            let images = []

            await req.files.map(file => {
                const newFile = {
                    name: file.originalname,
                    path: file.path,
                    extension: file.mimetype,
                    creationDate: Date.now(),
                    status: 'inactive'
                }
                const image = new Image(newFile)
                images.push(newFile)
                image.save()
            })

            res.status(200).json(images)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readAll: async (req, res) => {
        try {
            const images = await Image.find({})
            res.status(200).json(images)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readOne: async (req, res) => {
        try {
            const { id } = req.params
            const image = await Image.findById(id)
            res.status(200).json(image)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            await Image.findByIdAndUpdate(
                id,
                req.body,
                { new: true },
                (err, updatedImage) => {
                    err ? res.status(500).send(err) : res.status(200).json(updatedImage)
                }
            )
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params

            await Image.findByIdAndDelete(id, err => {
                err ? res.status(500).send(err) : res.status(200).json({ success: true })
            })

        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    }
}

module.exports = imageController