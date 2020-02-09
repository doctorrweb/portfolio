const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = new Schema({
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
    project: {
        type: Schema.Types.ObjectId,
        ref: 'project'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    images: [
        {
            type: String
        }
    ]
})

const Post = mongoose.model('post', PostSchema)

module.exports = Post