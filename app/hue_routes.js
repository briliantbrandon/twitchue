module.exports = function(app, hueAPI, test) {
    app.post('/events/follow', (req, res) => {
        console.log("We got a new follower!");
        res.send();
    });

    app.post('/events/subscribe', (req, res) => {
        console.log("We got a new subscriber!");
        
        hueAPI.setGroupLightState(6, {"on": false})

        res.send();
    });

    app.post('/input/test', (req, res) => {
        console.log("FORM WAS SUBMITTED BITCH!");
        test = "testy boiiiis";
        res.send();
    });

    app.get('/hue/bridge', (req, res) => {
        //this should return the IP from the stored config or do the search for the bridge and store the IP
        //return an error if a bridge could not be found
        res.send();
    });
}