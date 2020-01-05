module.exports = (app) => {
    app.get('/', function (req, res) {
        res.send('Hello World who works properly!')
    })
}