const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    surname: {
        type: String,
        lowercase: true
    },
    firstname: {
        type: String,
        lowercase: true
    },
    role: {
        type: String,
        lowercase: true,
        enum: [
            'suscriber',
            'manager',
            'administrator'
        ],
        required: true,
        default: 'suscriber'
    },
    email: {
        type: String,
        lowercase: true
    },
    password: {
        type: String
    }
})

const User = mongoose.model('user', UserSchema)