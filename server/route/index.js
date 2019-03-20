const route = require("express").Router()
const Op = require("sequelize").Op
const db = require('../database')
const rights = require('../rights.js')
const passport = require("../passport.js")
const users = db.users;
const products = db.products;

route.get("/jhucdghnbyhfxpqm", function (req, res, next) {
    res.send("<h2>hello</h2>")
})

route.post("/jhucdghnbyhfxpqm", function (req, res, next) {
    users.create({
        mobileno:req.body.phoneno,
        name : req.body.name,
        email:req.body.email,
        password:req.body.password,
        address:req.body.address,
        state: req.body.state,
        wishlist : '',
        cart : ''
    }).then((users) => {
        
        res.send(true)})
    .catch((err) => { console.error(err)
        res.send(false)})
    console.log("ADDED TO DATABASE")
})

route.post('/ashevisdkedjiqac', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return res.send(false); }
      if (!user) { return res.send(false) }
      req.logIn(user, function(err) {
        if (err) { return res.send(false); }
        return res.send(user);
      });
    })(req, res, next);
  });

route.post("/bvsdfgimeckgrtv", function (req, res, next) {
    if(req.body.username == "admin" && req.body.password=="adminrights"){
        rights.adminsaved = true;
        console.log(rights.usernamesaved)
        res.send(true)
    }
    else {
        rights.adminsaved = false;
        res.send(false)
    }

})

route.post("/qwdfghyubndsiosd", function (req, res, next) {
    products.findAll(
    ).then(function(data1) {

        var pro=[];

        data1.forEach(function (data1) {
            pro.push({
                name:data1.name,
                brand:data1.brand,
                price:data1.price,
                discount:data1.discount,
                id:data1.pid,
                qty: data1.qty
             })

        })
        res.send(pro)
    })
})

route.post("/opuihjcvbnfgrtma", function (req, res, next) {
    if(req.user != null){
        users.findAll({
            where:{
                mobileno:req.user.mobileno
            }
        })
        .then(function(UserProject){
            let cart = '';
            UserProject.forEach(function (data1) {
                    cart = data1.cart
            })
            let arr1 = cart.split(' ');
            products.findAll({
                where : {
                    pid : {
                        [Op.or] : arr1
                    }

                }
            }
            ).then(function(data1) {
                var pro=[];
                data1.forEach(function (data1) {
                    pro.push({
                        name:data1.name,
                        brand:data1.brand,
                        price:data1.price,
                        discount:data1.discount,
                        id:data1.pid,
                        qty: data1.qty
                        })
                })
                res.send(pro)
            })

        })
    }

    
})

route.post("/opuihjcvbnfgrtmb", function (req, res, next) {
    if(req.user != null){
        users.findAll({
            where:{
                mobileno:req.user.mobileno
            }
        })
        .then(function(UserProject){
            let cart = '';
            UserProject.forEach(function (data1) {
                    cart = data1.wishlist
            })
            let arr1 = cart.split(' ');
            products.findAll({
                where : {
                    pid : {
                        [Op.or] : arr1
                    }

                }
            }
            ).then(function(data1) {
                var pro=[];
                data1.forEach(function (data1) {
                    pro.push({
                        name:data1.name,
                        brand:data1.brand,
                        price:data1.price,
                        discount:data1.discount,
                        id:data1.pid,
                        qty: data1.qty
                        })
                })
                res.send(pro)
            })

        })
    }

    
})
route.post("/qwdfjhsdxcbvdfre", function (req, res, next) {
    res.send(req.user);
})

route.post("/ghfdrtyujhweqwmn", function (req, res, next) {
    req.logout();
    res.send(true)
    
})

route.post("/qwdfghyubndsiose", function (req, res, next) {

    let vari = req.body.filter;

    
    
    console.log("WE RECIEVED REQUEST")
    products.aggregate(vari, 'DISTINCT', { plain: false }).then(function(data1) {

        var pro=[];

        data1.forEach(function (data1) {
            pro.push(data1.DISTINCT)

        })
        res.send(pro)
        
    })
})

route.post("/sdjkoplmnjiuhbwe",function(req,res,next){
    fabs = req.body;
    console.log(req.body)
    
    products.findAll({
        where : {
            brand : {
                [Op.or] : fabs.brand.arr
            },
            size : {
                [Op.or] : fabs.size.arr
            },
            retailer : {
                [Op.or] : fabs.retailer.arr
            },
            discount : {
                [Op.or] : fabs.discount.arr
            },
            gender : {
                [Op.or] : fabs.gender.arr
            }
            
        }
    }
    ).then(function(data1) {

        var pro=[];

        data1.forEach(function (data1) {
            pro.push({
                name:data1.name,
                brand:data1.brand,
                price:data1.price,
                discount:data1.discount,
                id:data1.pid,
                qty:data1.qty
             })

        })
        res.send(pro)
    })

})

route.post("/sdjkoplmnjiuhbwf",function(req,res,next){
    fabs = req.body;
    console.log(req.body)
    
    products.findAll({
        where : {
            $or : [
                {name:{
                    [Op.or] : fabs.name.arr
                }},
                {brand : {
                    [Op.or] : fabs.brand.arr
                }},
                {size : {
                    [Op.or] : fabs.size.arr
                }},
                {retailer : {
                    [Op.or] : fabs.retailer.arr
                }},
                {discount : {
                    [Op.or] : fabs.discount.arr
                }},
                {gender : {
                    [Op.or] : fabs.gender.arr
                }}

            ]
            
            
        }
    }
    ).then(function(data1) {

        var pro=[];

        data1.forEach(function (data1) {
            pro.push({
                name:data1.name,
                brand:data1.brand,
                price:data1.price,
                discount:data1.discount,
                id:data1.pid,
                qty:data1.qty
             })

        })
        res.send(pro)
    })

})

route.post("/uiythjrefkrtvbna",function(req,res,next){
    if(req.user != null){
        
        users.findAll(
            {where: {
                mobileno:req.user.mobileno
            }}
        ).then(function(UsersProject) {
            let wish = '';
            UsersProject.forEach(function (data1) {
                 wish += data1.wishlist;
                 wish += " ";
                 console.log(data1.wishlist);
    
            })
            console.log(wish);
            wish += req.body.id;
            console.log(wish);
            users.update( { wishlist: wish },
            { where: { mobileno:req.user.mobileno } })
            .then(function(ans){
                res.send(true)
        })
        })
        

    }
    else{
        res.send(false);
    }

})
route.post("/uiythjrefkrtvbnp",function(req,res,next){
    if(req.user != null){
        
        users.findAll(
            {where: {
                mobileno:req.user.mobileno
            }}
        ).then(function(UsersProject) {
            let wish = '';
            UsersProject.forEach(function (data1) {
                 wish += data1.cart;
                 wish += " ";
                 console.log(data1.cart);
    
            })
            console.log(wish);
            wish += req.body.id;
            console.log(wish);
            users.update( { cart: wish },
            { where: { mobileno:req.user.mobileno } })
            .then(function(ans){
                res.send(true)
        })
        })
        

    }
    else{
        res.send(false);
    }

})

route.post("/polkmuhrfguinbvg",function(req,res,next){
    if(req.user!= null){
        users.findAll(
            {where: {
                mobileno:req.user.mobileno
            }}
        ).then(function(UsersProject) {
            let wish = '';
            UsersProject.forEach(function (data1) {
                 wish += data1.cart;
                 wish += " ";
    
            })
            newwish = wish.replace(req.body.id.toString(),"");
            newwish = newwish.trim();
            users.update( { cart: newwish },
            { where: { mobileno:req.user.mobileno } })
            .then(function(ans){
                res.send(true)
        })
        })
        

    }
    else{
        res.send(false);
    }

})
route.post("/polkmuhrfguinbvk",function(req,res,next){
    if(req.user != null){
        users.findAll(
            {where: {
                mobileno:req.user.mobileno
            }}
        ).then(function(UsersProject) {
            let wish = '';
            UsersProject.forEach(function (data1) {
                 wish += data1.wishlist;
                 wish += " ";
    
            })
            newwish = wish.replace(req.body.id.toString(),"");
            newwish = newwish.trim();
            console.log("new wish"+wish)
            users.update( { wishlist: newwish },
            { where: { mobileno: req.user.mobileno } })
            .then(function(ans){
                res.send(true)
        })
        })
        

    }
    else{
        res.send(false);
    }

})
module.exports = route