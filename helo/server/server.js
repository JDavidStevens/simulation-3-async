const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const sessionCtrl = require('./Controllers/sessionCtrl');
const authCtrl = require('./Controllers/authCtrl');
const robotCtrl = require('./Controllers/robotCtrl');


require('dotenv').config();

let { SERVER_PORT, SESSION_SECRET,CONNECTION_STRING } = process.env;

const app = express();

app.use(bodyParser.json());

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
)

massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
})


//Auth0 endpoints
app.get('/auth/callback', authCtrl.authCallBack)
app.post('/api/auth/logout', authCtrl.logout)

//session endpoints
app.get('/api/auth/setUser', sessionCtrl)
app.get('/api/auth/authenticated',sessionCtrl)

//Robots endpoints
app.get('/api/user/list',robotCtrl.read)


app.listen(SERVER_PORT, () => { console.log(`Sever is listening on port ${SERVER_PORT}.`) })