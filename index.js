const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require("./config/database");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const port = process.env.PORT || 3500;


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

const app = express()

const corsOptions = {
    //origin: "http://localhost:3000",
    origin: "https://revi-travel.netlify.app",
    credentials: true,
};

app.use(cors(corsOptions))
app.use(express.json())

connectDB();

// Setup Sessions - stored in MongoDB
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    })
);

// Main Routing
app.use('/', require('./routes'))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

//More Routes - Ensuring passport is initialized before auth requests
app.use('/post', require('./routes/post'))
app.use('/auth', require('./routes/auth'))

app.listen(port, ()=> {
    console.log('Server is running')
})