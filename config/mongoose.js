const mongoose = require('mongoose')

mongoose.connect(process.env.Mongo_URL).then(()=>{
    console.log("Connected to MongoDB 😊")
}).catch((err)=>{
    console.log(err)
    console.log("Error in connecting to DB 😐");
})