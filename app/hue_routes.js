module.exports = function(app, hueAPI) {
    app.post('/events/follow', (req, res) => {
        console.log("We got a new follower!");
        res.send()
    });

    app.post('/events/subscribe', (req, res) => {
        console.log("We got a new subscriber!");
        res.send()
    });

    app.get('/hue/bridge', (req, res, hueAPI) => {
        //this should return the IP from the stored config or do the search for the bridge and store the IP
        //return an error if a bridge could not be found
        res.send()
    });
}