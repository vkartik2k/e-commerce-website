const passport = require('passport')
const passportlocal = require('passport-local')
const Users = require('./database/index').users

passport.serializeUser(function(user, done){
    done(null, user.mobileno)
})

passport.deserializeUser(function(mobileno, done){
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

passport.use(new passportlocal.Strategy(function(mobileno, password, done){
    users.findAll(
        {where: {
            mobileno:mobileno,
            password: password
        }}
    ).then(function(UsersProject) {

        var ret_users=[];

        UsersProject.forEach(function (UserProject) {
            ret_users.push({
                phoneno:UserProject.mobileno,
                name:UserProject.name,
             })

        })
        if(ret_users.length==0){
            return done(null, false);
        }
        if(ret_users.length){
            return done(null, ret_users[0]);
        }
        else{

        }
        return done(null, false);
    })
}))

exports = module.exports = passport