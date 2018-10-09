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

// app.use((req,res,next)=>{
//     if(process.env.NODE_ENV==="Development" && req.session.user){
//         req.session.user={
//           id:1,
//           auth_id:'auth0|5baa50dfdcd689216002bbf5',
//           profile_name:'test@testmail.com',
//           email:'test@testmail.com',
//           picture:'https://s.gravatar.com/avatar/7c7456a81ee78d3937f3ea5e6939b2d1?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png',
//           robot_id:1  
//         }
//     }
//     next()
// })

//Auth0 endpoints
app.get('/auth/callback', authCtrl.authCallBack)
app.post('/api/auth/logout', authCtrl.logout)

//session endpoint
app.get('/api/user-data', sessionCtrl)

//Robots endpoints

//****Dashboard Page****
app.get('/api/user/self', robotCtrl.getSelf)
app.get('/api/recommended',robotCtrl.recommend)
app.post('/api/recommended/add',robotCtrl.add)

//****Profile Page****
// app.get('/api/user/self', robotCtrl.getSelf)
app.patch('/api/user/patch/:id',robotCtrl.update)

//****Search Page****
app.get('/api/user/list',robotCtrl.read)
app.get('/api/user/count', robotCtrl.count)
app.post('/api/friend/add',robotCtrl.newFriend)
app.post('/api/friend/remove',robotCtrl.remove)
// app.get('/api/user/list/:id',robotCtrl.getOne)


app.listen(SERVER_PORT, () => { console.log(`Sever is listening on port ${SERVER_PORT}.`) })