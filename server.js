const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const config = require('./config')

const routes = require('./api/routes')


const app = express()

/* ****
start - SETTING OF THE DATABASE
**** */

// Conection to Databse
mongoose.connect(config.devDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

// Test to connection to database
const db = mongoose.connection
db.once('open', () => {
    console.info('Connected to database')
})
// Error to connect to databse
db.on('error', err => {
    console.error(err)
})

/* ****
end - SETTING OF THE DATABASE
**** */


app.use(morgan('tiny'))

app.use(bodyParser.json({ limit: '50mb' }, { type: '*/*' }))
app.use(bodyParser.urlencoded({ extended: false }, { limit: '50mb' }))

app.get('/', (req, res) => {
    res.status(200).render('index', {
        content: 'test content'
    })
})

app.set('view engine', 'ejs')

routes(app)
app.use(express.static('public'))


app.listen(config.port, () => {
    console.log(`Express is launch: http://localhost:${config.port}`)
})