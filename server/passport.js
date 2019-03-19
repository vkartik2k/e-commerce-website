const passport = require('passport')
const passportStrategy = require('passport-local').Strategy
const Users = require('./database/index').users

passport.serializeUser(function(user, done){
    done(null, user.mobileno)
})

passport.deserializeUser(function(mobileno, done){
    console.log('hello')
    Users.findOne({
        where : {
            mobileno : mobileno
        }
    }).then(function(user){
        if(!user){
            return done(new Error("NO SUCH USER"));
        }
        return done(null, user);
    })

})

passport.use(new passportStrategy(function(mobileno, password, done){
    Users.findAll(
        {where: {
            mobileno:mobileno,
            password: password
        }}
    ).then(function(UsersProject) {
        UsersProject.forEach(function (UserProject) {
            return done(null, UserProject);
        })
        return done(null, false);
    })
        
    }
))

exports = module.exports = passport