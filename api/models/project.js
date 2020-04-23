const mongoose = require('mongoose')
const { Schema } = mongoose
const Post = require('./post')

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        lowercase: true,
        enum: [
            'graphic',
            'edition',
            'web',
            'mobile',
            'desktop',
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
        type: Date
    },
    endDate: {
        type: Date
    },
    trashDate: [
        {
            type: Date
        }
    ],
    status: {
        type: String,
        lowercase: true,
        enum: [
            'waiting',
            'inprogress',
            'completed',
            'rejected'
        ],
        required: true,
        default: 'waiting'
    },
    link: {
        type: String
    },
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
    image: {
        type: Schema.Types.ObjectId,
        ref: 'image'
    }
})


const Project = mongoose.model('project', ProjectSchema)

module.exports = Project