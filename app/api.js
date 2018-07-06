const express = require('express');
const hue = require('node-hue-api');
const app = express();

const port = 8000;

require('./hue_routes.js')(app);
app.listen(port, () =>{
    console.log('We are live on ' + port);
});