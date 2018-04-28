require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , app = express()
    , controller = require('./controller')
    , cors = require('cors')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')

app.use(bodyParser.json());
app.use(cors());

const{
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env

massive(CONNECTION_STRING).then( db => {
    app.set('db', db);
})

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use( new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET, 
    callbackURL: CALLBACK_URL,
    scope: 'openid profile email'
}, function (accessToken, refreshToken, extraParams, profile, done){
        //db calls
        const db = app.get('db');
        const {id, displayName, picture, emails} = profile;
        // console.log(profile)
        db.find_user([id]).then( users => {
            if(users[0]){
                return done(null, users[0].id)
            }
            else{
                db.create_user([displayName, id, picture, emails[0].value]).then ( createdUser => {
                    db.create_cart(user[0].id).then(cart => {
                        return done(null, cart[0].user_id)
                    })
                }).catch( e => console.log(e))
            }
        })
}))

passport.serializeUser( (id, done) => {
    console.log(id)
    return done(null, id)
})

passport.deserializeUser( (id, done) => {
    app.get('db').find_session_user([id]).then( user => {
        return done(null, user[0])
    })
})

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dashboard',         
    failureRedirect: 'http://localhost:3000'
}))

app.get('/auth/me', function(req, res) {            
    if(req.user){
        // console.log('hitting req.user', req.user)
        res.send(req.user);
    } else {
        // console.log('hitting else')
        res.status(401).send()                       
    }
})

app.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('http://localhost:3000')
})

app.get('/api/cart', controller.cart)
app.get('/api/order', controller.order)
app.post('/api/order', controller.createOrder)
app.put('/api/show', controller.createCart)
app.delete('/api/show/:id', controller.delete)


app.listen(3005, () => console.log('Nachos are ready, hot, hot, hot!'));
