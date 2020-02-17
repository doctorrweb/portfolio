const mongoose = require('mongoose')
const { Schema } = mongoose
const Project = require('../models/project')

const ClientSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'image'
    },
    description: {
        type: String
    },
    category: {
        type: String,
        lowercase: true,
        required: true,
        default: 'undefined'
    },
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'project'
        }
    ]
})

ClientSchema.pre('findOneAndDelete', next => {
    Project.deleteMany({ client: this._id }, err => err ? err : next())
})

const Client = mongoose.model('client', ClientSchema)

module.exports = Client