const mongoose = require('mongoose')
const { Schema } = mongoose
//const Post = require('../models/post')

const VideoSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    caption: {
        type: String,
        lowercase: true
    },
    path: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now(),
        required: true,
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
            'inactive',
            'active',
            'trash'
        ],
        required: true,
        default: 'inactive'
    }
})

const Video = mongoose.model('video', VideoSchema)

module.exports = Video