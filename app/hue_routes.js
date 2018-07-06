module.exports = function(app) {
    app.post('/follow', (req, res) => {
        console.log("We got a new follower!");
        res.send()
    });

    app.post('/subscribe', (req, res) => {
        console.log("We got a new subscriber!");
        res.send()
    });
}