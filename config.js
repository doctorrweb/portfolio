const { env } = process

const config = {
    nodeEnv: env.NODE_ENV || 'development',
    logStars: message => {
        console.info('*********')
        console.info(message)
        console.info('*********')
    },
    port: env.port || 3000,
    DB: env.db || 'mongodb://localhost:27017/drwb_dev',
    devDB: 'mongodb://localhost:27017/drwb_dev',
    testDB: 'mongodb://localhost:27017/drwb_test'
}

module.exports = config