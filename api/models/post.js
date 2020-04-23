const mongoose = require('mongoose')
const { Schema } = mongoose
const Comment = require('../models/comment')

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        lowercase: true,
        enum: [
            'personal',
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
    relation: {
        type: String
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'project'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    formation: {
        type: Schema.Types.ObjectId,
        ref: 'formation'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    image: {
        type: Schema.Types.ObjectId,
        ref: 'image'
    },
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'video'
        }
    ],
    lang: {
        type: String,
        lowercase: true,
        enum: ['en', 'fr', 'de'],
        required: true
    },
    translations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
})

PostSchema.pre('findOneandDelete', next => {
    Comment.deleteMany({ post: this._id }, err => err ? err : next())
})

const Post = mongoose.model('post', PostSchema)

module.exports = Post