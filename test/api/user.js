//const assert = require('assert')
//const mongoose = require('mongoose')
const User = require('../../api/models/user')


describe('User creation', function() {
    it('save an user', function() {
        const user = new User({
            method: 'local',
            local: {
                email: '',
                password: ''
            },
            surname: '',
            firstname: '',
            pic: '',
        })
        user.save()
    })
})