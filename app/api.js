const express = require('express');
const hue = require('node-hue-api');
const app = express();
const port = 8000;

var hueAPI = new hue.HueApi()
var config = require('../config')

require('./hue_routes.js')(app, hueAPI);
app.listen(port, () =>{
    console.log('We are live on ' + port);
});