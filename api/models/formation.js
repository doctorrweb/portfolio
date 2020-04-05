const mongoose = require('mongoose')
const { Schema } = mongoose
//const Post = require('../models/post')

const FormationSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String
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
    creationDate: {
        type: Date,
        default: Date.now(),
        required: true,
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
    images: {
        type: Schema.Types.ObjectId,
        ref: 'image'
    },
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'video'
        }
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
})

const Formation = mongoose.model('formation', FormationSchema)

module.exports = Formation