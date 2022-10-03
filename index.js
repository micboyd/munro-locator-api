const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Users
const authRoute = require('./routes/users/auth');
const munrosRoute = require('./routes/munros/munros');

require("dotenv").config();

const uri = process.env.DB_CONNECT;

mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
}).catch(err => {
    console.error("Error connecting to mongo", err);
});

// Json Parser
app.use(express.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    const allowedOrigins = [
        'http://localhost:4200'
    ];

    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Route Middlewears
app.use('/api/users', authRoute);
app.use('/api/munros', munrosRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running');
});