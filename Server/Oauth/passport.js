const passport = require('passport')
const googleStrategy = require('passport-google-oauth20')
const {User} = require('../Model/user')

require('dotenv').config()
const clientId = process.env.CLIENTID
const clientSecret = process.env.CLIENTSECRET

passport.use(new googleStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: '/auth/google/callback'
},
    async function(accessToken, refreshToken, profile, done){
        console.log(profile)
        try{
            let user = await User.findOne({email: profile.emails[0].value});
            if(!user){
                user = User.create({ email: profile.emails[0].value}) 
            }
            return done(null, user)
    }
    catch(err){
        return done(err, null)
    }
    }
))

passport.serializeUser((user, done)=>{
    done(null, user)
})

passport.deserializeUser(async (id, done)=>{
    let user = await User.findById(id)
    done(null, user)
})

module.exports = passport;