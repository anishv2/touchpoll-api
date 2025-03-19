require('dotenv').config();
const express = require('express');
const unprotRouter = require('./routes/unprotected');
const pollRouter = require('./routes/polls');
const userRouter = require('./routes/user');
const ejs = require('ejs');
const path = require('path');
const cors = require('cors');

// declare core modules
const app = express();
app.use(express.static('public'));
app.use(express.json());

// cors declaration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}));


// unrprotected routes
app.use('/', unprotRouter);

// protected routes
app.use('/', userRouter);
app.use('/', pollRouter);
app.set('view engine', 'ejs');

const server = app.listen(process.env.PORT, (error) => {
    try {
        if (error) {
            console.log('/// SERVER CRASH ///', error);
        }
        else {
            console.log('SERVER started...', server.address().port);
        }
    }
    catch(err){
        console.log('/// SERVER CRASH ///', err);
    }
})

