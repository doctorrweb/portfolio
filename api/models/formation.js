const mongoose = require('mongoose')
const { Schema } = mongoose
//const Post = require('../models/post')

const FormationSchema = new Schema({
    title: {
        type: String,
        lowercase: true,
        required: true
    },
    subTitle: {
        type: String,
        lowercase: true
    },
    content: {
        type: String,
        required: true
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
    images: [
        {
            type: Schema.Types.ObjectId,
            ref: 'image'
        }
    ],
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