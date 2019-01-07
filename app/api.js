const express = require('express');
const hue = require('node-hue-api');
const app = express();
var bodyparser = require('body-parser');

const port = 8000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

process.on('message', (params) => {
    var hueAPI = new hue.HueApi(params.bridgeIP, params.hueUser);
    require('./hue_routes.js')(app, hueAPI, params.websocketToken);
    app.listen(port, () =>{
        console.log('We are live on ' + port);
    });
});