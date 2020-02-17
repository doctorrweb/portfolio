const mongoose = require('mongoose')
const config = require('../../config')

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
    console.log('Connected to the test database')
})
// Error to connect to databse
db.on('error', err => {
    console.error(err)
})

/* ****
    end - SETTING OF THE DATABASE
    **** */



