const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const users = require('./database/index.js').users

passport.serializeUser(function(user, done){
    done(null, user.mobileno)
})

passport.deserializeUser(function(mobileno, done){
    users.findOne({
        where : {
            mobileno : mobileno
        }
    }).then((user) => {
        if (!user) {
            return done(new Error("No such user"))
        }
        return done(null, user)
    }).catch((err) => {
        done(err)
    })

})

passport.use(new LocalStrategy({
    usernameField: 'mobileno',
    passwordField: 'password'
},function (mobileno, password, done) {
    users.findOne({
        where: {
            mobileno: mobileno
        }
    }).then((user) => {
        console.log(user);
        if (!user) {
            return done(null, false, {message: "No such user"})
        }
        if (user.password !== password) {
            return done(null, false, {message: "Wrong password"})
        }
        return done(null, user)
    }).catch((err) => {
        return done(err)
    })
}))

exports = module.exports = passport