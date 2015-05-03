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
            ws.send("Message to send");
        }, 500);
    });

})();
