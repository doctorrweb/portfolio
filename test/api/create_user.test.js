//const server = require('../server')
//const chai = require('chai')
//const chaiHttp = require('chai-http')

//const { expect } = chai
//chai.use(chaiHttp)

//describe('/')

/*
const assert = require('assert')
//const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const casual = require('casual')
const User = require('../../api/models/user')


describe('User Create Test', () => {
    it('save an user', done => {
        bcrypt.genSalt(13, (err, salt) => {
            const user = new User({
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
                    assert(!user.isNew)
                    done()
                })
            })
        })
    })
    
})
*/