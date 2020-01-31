const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

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
    },
    image: String,
})

UserSchema.methods.isValidPassword = function(newPassword) {
    return bcrypt.compare(newPassword, this.password)
}

const User = mongoose.model('user', UserSchema)

module.exports = User