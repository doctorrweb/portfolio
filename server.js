const https = require('https')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const morgan = require('morgan')
const fs = require('fs')
require('dotenv').config()

const appRouter = require('./api/routes')

const app = express()


/* ****
start - SETTING OF THE DATABASE
**** */

// Conection to Databse
mongoose.connect(process.env.DB, {
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

app.use(cors())

// Rale Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 100, // 10 mins
    max: 1000
})

app.use(limiter)

// Prevent http param pollution
app.use(hpp())

app.get('/', (req, res) => {
    const pathToHtmlFile = 'public/dist/index.html'
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8')
    res.status(200).send(contentFromHtmlFile)
})

app.use('/api', appRouter)
app.use(express.static('public'))

const serverOptions = {
    key: fs.readFileSync('./ssl/privkey.pem'),
    cert: fs.readFileSync('./ssl/fullchain.pem')
}

const server = https.createServer(serverOptions, app).listen(process.env.PORT, () => {
    console.log(`Express is launch: ${process.env.BASE_URL}:${process.env.PORT}`)
})

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`)
    server.close(() => process.exit(1))
})


module.exports = app