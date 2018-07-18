const express = require('express');
const hue = require('node-hue-api');
const app = express();
const port = 8000;

var config = require('../config');
var hueAPI = new hue.HueApi(config.bridgeIP, config.hueUser);
var test = "";

var displayResult = function(data) {
    console.log(JSON.stringify(data.groups, null, 2));
}

//hueAPI.fullState().then(displayResult).done();

require('./hue_routes.js')(app, hueAPI, test);
app.listen(port, () =>{
    console.log('We are live on ' + port);
});