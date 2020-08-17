const express = require('express');
const mongoose = require('mongoose');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
require('dotenv/config');
app.use(bodyParser.json());

//Import Routes
const postsRoute = require('./routes/posts');
const getsRoute = require('./routes/gets');
app.use('/posts',postsRoute);
app.use('/',getsRoute);

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true,useUnifiedTopology: true },()=>{
    console.log('connected to DB!');
})

//Listening to the server
app.listen(port,()=>{console.log("Listening on port "+port)});
