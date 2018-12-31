const express = require('express');
const hue = require('node-hue-api');
const app = express();
var bodyparser = require('body-parser');
const port = 8000;

var config = require('../config');
var hueAPI = new hue.HueApi(config.bridgeIP, config.hueUser);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
require('./hue_routes.js')(app, hueAPI);
app.listen(port, () =>{
    console.log('We are live on ' + port);
});
