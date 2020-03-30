const Video = require('../models/video')

const videoController = {
    create: async (req, res) => {
        try {
            let videos = []

            await req.files.map(file => {
                const newFile = {
                    name: file.originalname,
                    path: file.path,
                    extension: file.mimetype,
                    creationDate: Date.now(),
                    status: 'inactive'
                }
                const video = new Video(newFile)
                videos.push(newFile)
                video.save()
            })

            res.status(200).json(videos)

        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readAll: async (req, res) => {
        try {
            const video = await Video.find({})
            res.status(200).json(video)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readOne: async (req, res) => {
        try {
            const { id } = req. params
            const video = await Video.findById(id)
            res.status(200).json(video)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            await Video.findByIdAndUpdate(
                id,
                req.body,
                { new: true },
                (err, updatedVideo) => {
                    err ? res.status(500).send(err) : res.status(200).json(updatedVideo)
                }
            )
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params

            await Video.findByIdAndDelete(id, err => {
                err ? res.status(500).send(err) : res.status(200).json({ success: true })
            })
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    }
}

module.exports = videoController