const mongoose = require('mongoose')
const { Schema } = mongoose

const ClientSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    image: String,
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

const Client = mongoose.model('client', ClientSchema)

module.exports = Client