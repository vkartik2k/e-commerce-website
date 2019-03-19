const route = require("express").Router()

route.get('/', function(req,res){
    res.send("MY PRIVATE ADMIN PAGE")

})

exports = module.exports = route