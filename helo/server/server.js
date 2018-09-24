const express = require('express');
const bodyParser = require('body-parser');
const session= require('express-session');
const sessionCtrl = require('./Controllers/sessionCtrl');
require('dotenv').config();

let {SERVER_PORT,SESSION_SECRET}=process.env;

const app = express();

app.use( bodyParser.json());

app.use(
session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
})
)

//session endpoint
app.get('/api/auth/setUser',sessionCtrl)

//Auth0 endpoints



app.listen(SERVER_PORT, ()=> {console.log(`Sever is listening on port ${SERVER_PORT}.`)})