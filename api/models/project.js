const mongoose = require('mongoose')
const { Schema } = mongoose
const Post = require('../models/post')

const ProjectSchema = new Schema({
    title: {
        en: {
            type: String,
            lowercase: true
        },
        fr: {
            type: String,
            lowercase: true
        },
        de: {
            type: String,
            lowercase: true
        }
    },
    subTitle: {
        en: {
            type: String,
            lowercase: true
        },
        fr: {
            type: String,
            lowercase: true
        },
        de: {
            type: String,
            lowercase: true
        }
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

ProjectSchema.pre('findOneAndDelete', next => {
    Post.deleteMany({ project: this._id }, err => err ? err : next())
})

const Project = mongoose.model('project', ProjectSchema)

module.exports = Project