const lodash = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

const getToken = user => {
    
    const timeStamp = new Date().getTime()

    return jwt.encode(
        {
            sub: user.id,
            name: user.surname,
            firstname: user.firstname,
            iat: timeStamp,
            role: user.role
        },
        config.secret
    )
}

const userController = {
    signUp: async (req, res, next) => {
        const { email, password } = req.body
        try {
            await User.findOne({ email }, (err, existingUser) => {
                if (err) {
                    return next(err)
                }
                if (existingUser) {
                    return res.status(422).json({ error: 'this email already exists' })
                }
                if (lodash.isEmpty(email) || lodash.isEmpty(password)) {
                    return res
                        .status(422)
                        .json({ error: 'email or password field is empty' })
                } else {
                    bcrypt.genSalt(13, (err, salt) => {
                        const newUser = new User(req.body)
                        bcrypt.hash(password, salt, function(err, hash) {
                            // Store hash in your password DB.
                            newUser.password = hash
                            newUser.save()
                            return res.status(201).json(newUser)
                        })
                    })
                }
            })
        } catch (error) {
            return res.status(400).json({ message: 'Bad Request' })
        }
    },
    signIn: async (req, res, next) => {
        try {
            res.status(200).json({ token: getToken(req.user) })
        } catch (error) {
            //console.log(error)
            next(error)
        }
    },
    getAll: async (req, res) => {
        const users = await User.find({})
        res.status(200).json(users)
    },
    getOne: async (req, res) => {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    },
    update: async (req, res) => {
    // Enforce that req.body must contain all the fields
        const { id } = req.params
        await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true },
            (err, updatedUser) => {
                err ? res.status(500).send(err) : res.status(200).send(updatedUser)
            }
        )
    },
    delete: async (req, res) => {
        const { id } = req.params
        await User.findByIdAndDelete(id, err => {
            err ? res.status(500).send(err) : res.status(200).json({ success: true })
        })
    }
}


module.exports = userController