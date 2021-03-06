const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./middleware/logger');
require('dotenv').config();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const session = require('express-session');

const corsOption = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open',() => console.log('DB connection Success'));

app.use(express.json());
app.use(session({
    saveUninitialized: true,
}));
app.get('/home',(req,res) => {
    res.status(200).send('Welcome : ' + req.session.username + " test login : " + req.session.login);
})
const accountRouter = require('./route/account-router');
const formRouter = require('./route/form-router');

app.use('/user',accountRouter);
app.use('/form',formRouter);


app.listen(port,() => console.log(`Server is running on port ${port}`));