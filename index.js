const express = require('express')
require('dotenv').config();
const app = express();
const port = 5000 || process.env.port;
const multer = require('./config/multerConfig')
const db = require('./config/mongoose')

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('assets'));    //accesing static files from assets folder
app.use('/uploads',express.static(__dirname+'/uploads'));   //accesing uploaded files from uploads folder 

app.use(express.urlencoded({ extended: true })) 
app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){console.log("Error in starting server 😐 at Port",port)}
    console.log("Server started at port",port,"😊")
})
