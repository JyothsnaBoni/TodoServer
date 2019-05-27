/* Load modules */
const express = require("express");
var cors = require('cors');
var app = express();

app.use(cors()) ;


const bodyParser = require("body-parser");

/* Database configuration */
const database = require('./database.js');

/* Init database */
database.init();

/* Init server listening */
const port = process.argv[2] || 3000;
app.listen(port, function () {
    console.log("Server listening on port : " + port);
});

/* Express configuration */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.options('*', cors()); // include before other routes
/* Router configuration */
const REST_API_ROOT = '/';
app.use(REST_API_ROOT, require('./app/route/router')
);






