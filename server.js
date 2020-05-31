const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const morgan = require('morgan')
const config = require('./config')

const { env } = process

const appRouter = require('./api/routes')

const app = express()

/* ****
start - SETTING OF THE DATABASE
**** */

// Conection to Databse
mongoose.connect(  env.NODE_ENV === 'development' ? config.devDB : config.DB, {
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

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// prevent cross site scrpting 'xss' attacks
app.use(xss())

// Rale Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 100, // 10 mins
    max: 1000
})

app.use(limiter)

// Prevent http param pollution
app.use(hpp())

app.get('/', (req, res) => {
    res.status(200).render('index', {
        content: ''
    })
})

app.set('view engine', 'ejs')

//routes(app)
app.use('/api', appRouter)
app.use(express.static('public'))


app.listen(config.port, () => {
    console.log(`Express is launch: http://localhost:${config.port}`)
})

module.exports = app