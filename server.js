const bodyParser = require('body-parser');
const express = require('express');
const db = require('./config/database');
const path = require('path');
const LocalStrategy = require('./middlewares/passportLocal');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const port = 8080;

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname + '/assets')));
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUserData);


app.use('/', require('./routers'));

app.listen(port, (err) => {
    if (!err) {
        console.log("Server Started on \nhttp://localhost:" + port);
    }
    db
})