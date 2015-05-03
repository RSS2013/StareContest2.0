(function () {
    var WebSocketServer;
    var wss;

    WebSocketServer = require('ws').Server;
    wss             = new WebSocketServer({ port: 8080 });

    wss.on('connection', function connection(ws) {

        ws.on('message', function incoming(message) {
            console.log('received: %s', { "test_key": "test_val"});
        });


        setInterval(function() {
            j_blob = JSON.stringify({
                "Player1" : {
                    "con": Math.floor(Math.random() * 100),
                    "mel": Math.floor(Math.random() * 100),
                    "atk": (Math.floor(Math.random() * 6) == 1),
                },
                "Player2" : {
                    "con": Math.floor(Math.random() * 100),
                    "mel": Math.floor(Math.random() * 100),
                    "atk": (Math.floor(Math.random() * 6) == 1),
                }
            });
            ws.send(j_blob);
        }, 500);
    });

})();
