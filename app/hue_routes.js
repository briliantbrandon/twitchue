module.exports = function(app, hueAPI) {
    app.post('/events/follow', (req, res) => {
        console.log("We got a new follower!");
        lights = req.body.lights;
        effect(hueAPI, lights, {'effect': 'colorloop'}, {'effect': 'none'});
        res.send();
    });

    app.post('/events/subscribe', (req, res) => {
        console.log("We got a new subscriber!");
        lights = req.body.lights;
        effect(hueAPI, lights, {'effect': 'colorloop', 'alert': 'lselect'}, {'effect': 'none', 'alert': 'none'});
        res.send();
    });

    app.get('/hue/bridge', (req, res) => {
        //this should return the IP from the stored config or do the search for the bridge and store the IP
        //return an error if a bridge could not be found
        res.send();
    });

    app.get('/hue/config', (req, res) => {
        //hueAPI.fullState().then(displayResult).done();
        hueAPI.fullState().then(function (data){
            res.send(data);
        }).done()
    });

    function effect(hueAPI, lights, effect, stop) {
        for(i = 0; i < lights.length; i++) {
            hueAPI.setLightState(lights[i], effect);
            setTimeout(stopLight, 10000, hueAPI, lights[i], stop);
        }
    }
    
    function stopLight(hueAPI, light, stop) {
        hueAPI.setLightState(light, stop);
    }
}