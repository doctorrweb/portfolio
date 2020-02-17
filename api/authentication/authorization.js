const jwt = require('jwt-simple')
const { secret } = require('../config')

// middleware for doing role-based permissions
function authorize(...allowed) {
    const isAllowed = role => allowed.indexOf(role) > -1
    // return a middleware
    return (req, res, next) => {
        const token = req.headers.authorization
        const user = jwt.decode(token, secret)

        if (isAllowed(user.role)) next()
        // role is allowed, so continue on the next middleware
        else {
            res.status(403).json({ message: 'Forbidden' }) // user is forbidden
        }
    }
}

module.exports = authorize
