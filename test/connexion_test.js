const mongoose = require('mongoose')
const config = require('../config')

describe('Database connexion', () => {
    before( done => {
        /* ****
    start - SETTING OF THE DATABASE
    **** */

        // Conection to Databse
        mongoose.connect(config.testDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        mongoose.set('useCreateIndex', true)
        mongoose.set('useFindAndModify', false)

        // Test to connection to database
        const db = mongoose.connection
        db.once('open', () => {
            console.info('Connected to the test database')
            done()
        })
        // Error to connect to databse
        db.on('error', err => {
            console.error(err)
        })

        /* ****
    end - SETTING OF THE DATABASE
    **** */
    })
})



