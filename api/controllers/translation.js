const Translation = require('../models/translation')
const Post = require('../models/post')
const Formation = require('../models/formation')
const Project = require('../models/project')
const Client = require('../models/client')

const translationController = {

    create: async (req, res) => {

        console.log('createTranslation values', req.body)
        
        try {
            console.log('createTranslation try block values', req.body)
            const translation = new Translation(req.body)
            await translation.save()

            // link the translation to the related post
            if (translation.post) {
                const post = await Post.findById(translation.post)
                if (translation.lang === 'fr') {
                    post.translations.fr = translation._id
                    await post.save()
                }
                if (translation.lang === 'de') {
                    post.translations.de = translation._id
                    await post.save()
                }
            }

            // link the translation to the related formation
            if (translation.formation) {
                const formation = await Formation.findById(translation.formation)
                if (translation.lang === 'fr') {
                    formation.translations.fr = translation._id
                    await formation.save()
                }
                if (translation.lang === 'de') {
                    formation.translations.de = translation._id
                    await formation.save()
                }
            }

            // link the translation to the related project
            if (translation.project) {
                const project = await Project.findById(translation.project)
                if (translation.lang === 'fr') {
                    project.translations.fr = translation._id
                    await project.save()
                }
                if (translation.lang === 'de') {
                    project.translations.de = translation._id
                    await project.save()
                }
            }

            // link the translation to the related client
            if (translation.client) {
                const client = await Client.findById(translation.client)
                if (translation.lang === 'fr') {
                    client.translations.fr = translation._id
                    await client.save()
                }
                if (translation.lang === 'de') {
                    client.translations.de = translation._id
                    await client.save()
                }
            }

            res.status(201).json(translation)

        } catch (error) {
            console.log('createTranslation error', error)
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readAll: async (req, res) => {
        try {
            
            const translations = await Translation.find({})
                .populate({ path: 'post', select: 'title' })
                .populate({ path: 'project', select: 'title' })
                .populate({ path: 'formation', select: 'title' })
                .populate({ path: 'client', select: 'name' })

            res.status(200).json(translations)

        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readOne: async (req, res) => {

        const { id } = req.params
        const translation = await Translation.findById(id)
            .populate({ path: 'post', select: 'title' })
            .populate({ path: 'project', select: 'title' })
            .populate({ path: 'formation', select: 'title' })
            .populate({ path: 'client', select: 'name' })
            
        res.status(200).json(translation)
    },
    update: async (req, res) => {

        const { id } = req.params

        await Translation.findByIdAndUpdate(
            id,
            req.body,
            { new: true },
            (err, updatedTranslation) => {
                err ? res.status(500).send(err) : res.status(200).json(updatedTranslation)
            }
        )
    },
    delete: async (req, res) => {

        const { id } = req.params
        const response = {}
        const translation = await Translation.findById(id)

        await Translation.findByIdAndDelete(id, err => {
            err ? res.status(500).send(err) : Object.assign(response, { translation: 1 })
        }) 

        // Remove the translation in the related post
        if (translation.post) {
            const post = await Post.findById(translation.post)
            if (translation.lang === 'fr') {
                post.translation.fr = null
                post.save()
            }
            if (translation.lang === 'de') {
                post.translation.de = null
                post.save()
            }
        }

        // Remove the translation in the related project
        if (translation.project) {
            const project = await Project.findById(translation.project)
            if (translation.lang === 'fr') {
                project.translation.fr = null
                project.save()
            }
            if (translation.lang === 'de') {
                project.translation.de = null
                project.save()
            }
        }

        // Remove the translation in the related project
        if (translation.formation) {
            const formation = await Formation.findById(translation.formation)
            if (translation.lang === 'fr') {
                formation.translation.fr = null
                formation.save()
            }
            if (translation.lang === 'de') {
                formation.translation.de = null
                formation.save()
            }
        }

        res.status(200).json(response)
    }
}

module.exports = translationController