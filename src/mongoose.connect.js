const mongoose = require('mongoose')


module.exports = mongoConfig =>{
    return mongoose.connect(mongoConfig.host,{
        useNewUrlParser:true,
        useUnifiedTopology:true
        })
    }