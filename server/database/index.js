const Sequelize = require("sequelize")

const ecommerce = new Sequelize('ecommerce','root','',{
    host : 'localhost',
    dialect : 'mysql',
    pool : {
        min:0,
        max:5
    }
})

const users = ecommerce.define('Users', {
    mobileno : {
        type: Sequelize.STRING,
        primaryKey : true
    },
    name : {
        type: Sequelize.STRING
    },
    password : {
        type: Sequelize.STRING
    },
    email : {
        type: Sequelize.STRING
    },
    address : {
        type: Sequelize.STRING
    },
    state : {
        type: Sequelize.STRING
    },
    wishlist : {
        type: Sequelize.STRING
    },
    cart : {
        type: Sequelize.STRING
    }
})

const products = ecommerce.define('products', {
    pid : {
        type: Sequelize.STRING,
        primaryKey : true
    },
    name : {
        type: Sequelize.STRING
    },
    brand : {
        type: Sequelize.STRING
    },
    price : {
        type: Sequelize.FLOAT
    },
    discount : {
        type: Sequelize.STRING
    },
    priority : {
        type: Sequelize.STRING
    },
    qty : {
        type: Sequelize.INTEGER
    },
    category : {
        type: Sequelize.STRING
    },
    gender : {
        type: Sequelize.STRING
    },
    size : {
        type: Sequelize.STRING
    },
    retailerid : {
        type: Sequelize.STRING
    },
    retailer :{
        type: Sequelize.STRING
    },
    description:{
        type: Sequelize.STRING
    }
    
})

ecommerce.sync()
    .then(() => console.log("DATABASE HAS BE SYNCED"))
    .catch((err) => console.error("PROBLEM IN SYNCING DATABASE"))

exports = module.exports = { users,products}