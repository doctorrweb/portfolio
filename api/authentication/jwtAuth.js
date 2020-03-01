const passport = require('passport')
const config = require('../config')
const User = require('../models/user')
const { ExtractJwt, Strategy } = require('passport-jwt')
const JWTStrategy = Strategy

const verify = async (payload, done) => {
    try {
    // Find the user specified in token
        const user = await User.findById(payload.sub)

        // If usrer doesn't exist, handle it
        if (!user) {
            return done(null, false)
        }

        // Otherwise, return user
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromHeader('authorization'),
            secretOrKey: config.secret
        },
        verify
    )
)