const mongoose = require('mongoose')
const { Schema } = mongoose

const ProjectSchema = new Schema({
    title: {
        type: String,
        lowercase: true,
        required: true
    },
    subTitle: {
        type: String,
        lowercase: true
    },
    category: {
        type: String,
        lowercase: true,
        enum: [
            'personnal',
            'professional',
            'undefined'
        ],
        required: true,
        default: 'undefined'
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'client',
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    endDate: {
        type: Date
    },
    publicationDate: [
        {
            type: Date
        }
    ],
    trashDate: [
        {
            type: Date
        }
    ],
    status: {
        type: String,
        lowercase: true,
        enum: [
            'pending',
            'active',
            'trash'
        ],
        required: true,
        default: 'pending'
    },
    link: String,
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    testimonies: [
        {
            type: String
        }
    ],
    image: [
        {
            type: String
        }
    ],
})

const Project = mongoose.model('project', ProjectSchema)

module.exports = Project