/*
//const assert = require('assert')
//const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const casual = require('casual')
const User = require('../../api/models/user')


describe('User Read Test', () => {
    let user
    beforeEach(done => {
        bcrypt.genSalt(13, (err, salt) => {
            user = new User({
                method: 'local',
                local: {
                    email: casual.email,
                    password: '123++bbb'
                },
                surname: casual.last_name,
                firstname: casual.first_name,
                pic: ''
            })
            bcrypt.hash(user.local.password, salt, (err, hash) => {
                user.local.password = hash
                user.save().then(() => {
                    done()
                })
            })
        })
    })
    it('Read all users', (done) => {
        User.find({}, users => {
            console.log(users)
            done()
        })
    })
})
*/