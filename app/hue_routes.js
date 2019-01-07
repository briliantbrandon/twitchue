module.exports = function(app, hueAPI, token) {
    app.post('/events/follow', (req, res) => {
        console.log("We got a new follower!");
        lights = req.body.lights;
        effect(hueAPI, lights, {'effect': 'colorloop'}, {'effect': 'none'}, 8000);
        res.send();
    });

    app.post('/events/subscribe', (req, res) => {
        console.log("We got a new subscriber!");
        lights = req.body.lights;
        effect(hueAPI, lights, {'effect': 'colorloop', 'alert': 'lselect'}, {'effect': 'none', 'alert': 'none'}, 8000);
        res.send();
    });

    app.post('/events/bits', (req, res) => {
        lights = req.body.lights;
        effect(hueAPI, lights, {'alert': 'lselect'}, {'alert': 'none'}, 3000);
        res.send();
    });

    app.get('/streamlabs/token', (req, res) => {
        let wstoken = {wstoken: token};
        res.setHeader('Content-Type', 'application/json');
        res.send(wstoken);
    });

    app.get('/hue/config', (req, res) => {
        hueAPI.fullState().then(function (data){
            res.send(data);
        }).done()
    });

    function effect(hueAPI, lights, effect, stop, time) {
        for(i = 0; i < lights.length; i++) {
            hueAPI.setLightState(lights[i], effect);
            setTimeout(stopLight, time, hueAPI, lights[i], stop);
        }
    }
    
    function stopLight(hueAPI, light, stop) {
        hueAPI.setLightState(light, stop);
    }
}