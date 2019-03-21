const express = require("express")
const session = require("express-session");
const passport = require('./passport')
const route = require(__dirname+'/route')
const db = require('./database')
const products = db.products
const server = express()

function roundNumber(rnum, rlength) { 
    var newnumber = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
    return newnumber;
}

server.set('view engine','hbs')

server.use(express.json())
server.use(express.urlencoded({extenstion:true}))

server.use(session({
    secret: 'iloveabigstringwhichissecret'
}))
server.use(passport.initialize())
server.use(passport.session())

server.use('/login', express.static(__dirname+'/login'))
server.use('/admin', express.static(__dirname+'/admin'))
server.use('', express.static(__dirname+'/public'))
server.use('/route',route)
server.get('/product/:pida',function(req,res){
    
    products.findAll({
        where:{
            pid:req.params.pida
        }
    }).then(function(UserProject){
        let objc = {
            id:"",
            name:"",
            companyname:"",
            price:"",
            discount:"",
            mrp:"",
            description:``
        }
        let count = 0;
        UserProject.forEach(function (data1) {
            objc.id= data1.pid
            objc.name = data1.name
            objc.mrp = data1.price
            objc.discount = data1.discount+"%"
            objc.description = data1.description
            objc.companyname = data1.brand
            objc.dis = parseInt(objc.mrp)*(parseInt(objc.discount)/100.0);
            objc.price = roundNumber(objc.mrp-objc.dis,2)
            count++;
            
        })
        if(count){
            res.render('products',objc)
        }
        else{
            res.send("<center><h1>No Such Page Exists</h1></center>")
        }
        
    })

    
    
})

server.listen(1212, function(){
    console.log("Server running on http://localhost:1212")
})