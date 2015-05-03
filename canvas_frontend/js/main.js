window.onload = function() {
    "use strict";

    console.log("YO!");

    var timer_done = false;

    var player_2_conc = 0;
    var player_2_mellow = 0;
    var player_2_atk = false;

    var player_1_conc = 0;
    var player_1_mellow = 0;
    var player_1_atk = false;

    var total_player_1_conc = 0;
    var total_player_2_conc = 0;
    var total_player_1_mellow = 0;
    var total_player_2_mellow = 0;

    var message_count = 0;



    function WebSocketTest() {
        if ("WebSocket" in window) {
            let ws;

            console.log("WebSocket is supported by your Browser!");
            // Let us open a web socket
            ws = new WebSocket("ws://localhost:8080/echo");
            ws.onopen = function() {
                // Web Socket is connected, send data using send()
            };
            ws.onmessage = function(evt) {
                // let received_msg;
                var received_msg = evt.data;
                var obj = JSON.parse(received_msg);

                message_count = message_count + 1;

                // reset global (scoff) variables w/ each new message
                player_1_conc   = obj['Player1']['con'];
                player_1_mellow = obj['Player1']['mel'];
                player_1_atk    = obj['Player1']['atk'];

                player_2_conc   = obj['Player2']['con'];
                player_2_mellow = obj['Player2']['mel'];
                player_2_atk    = obj['Player2']['atk'];

                total_player_1_conc   = total_player_1_conc + player_1_conc;
                total_player_2_conc   = total_player_2_conc + player_2_conc;
                total_player_1_mellow = total_player_1_mellow + player_1_mellow;
                total_player_2_mellow = total_player_2_mellow + player_2_mellow;

            };
        } else {
            // The browser doesn't support WebSocket
            console.log("WebSocket NOT supported by your Browser!");
        }
    }

    WebSocketTest();







    // ---

    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function drawRectangle(myRectangle, context) {
        context.beginPath();
        context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
        context.fillStyle = '#033649';
        context.fill();
        context.lineWidth = myRectangle.borderWidth;
        context.strokeStyle = '#031634';
        context.stroke();
    }

    // {x, y, radius, start ∠, end ∠, anticlockwise_bool}
    function drawCircle(myCircle, ctxt) {
        ctxt.beginPath();
        ctxt.arc(myCircle.x, myCircle.y, myCircle.radius, myCircle.startAngle, myCircle.endAngle, myCircle.antiClockwise);
        ctxt.fillStyle = myCircle.color;
        ctxt.closePath();
        ctxt.fill();
        // ctxt.lineWidth = myCircle.borderWidth;
        // ctxt.strokeStyle = 'black';
        // ctxt.stroke();
    }

    function currentRadFor (myCirc) {
        return player_2_conc;
    };

    function displayFinalScores () {
        context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

        circPlayer1Conc.radius   = Math.floor(total_player_1_conc / message_count);
        circPlayer2Conc.radius   = Math.floor(total_player_2_conc / message_count);
        circPlayer1Mellow.radius = Math.floor(total_player_1_mellow / message_count) + circPlayer1Conc.radius;
        circPlayer2Mellow.radius = Math.floor(total_player_2_mellow / message_count) + circPlayer2Conc.radius;

        let winner;

        if ((circPlayer1Conc + circPlayer1Mellow) > (circPlayer2Conc + circPlayer2Mellow)) {
            drawCircle(circPlayer1Mellow, context);
            drawCircle(circPlayer1Conc, context);
        } else {
            drawCircle(circPlayer2Mellow, context);
            drawCircle(circPlayer2Conc, context);
        }

    };

    function updateCanvas (canvas, context, startTime) {
        context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

        circPlayer1Conc.radius = player_1_conc;
        circPlayer2Conc.radius = player_2_conc;
        circPlayer1Mellow.radius = player_1_mellow + circPlayer1Conc.radius;
        circPlayer2Mellow.radius = player_2_mellow + circPlayer2Conc.radius;

        drawCircle(circPlayer1Mellow, context)
        drawCircle(circPlayer2Mellow, context)
        drawCircle(circPlayer1Conc, context)
        drawCircle(circPlayer2Conc, context)

        // request new frame
        requestAnimFrame(function() {
            if (timer_done == false) {
                updateCanvas(canvas, context, startTime);
            } else {
                displayFinalScores();
                console.log(message_count);
                console.log(total_player_1_conc);
                console.log("final Score: ", (total_player_1_conc / message_count));
            }
        });
    };


    function updateCircle(myCircle, canvas, context, startTime, newRadius) {
        myCircle.radius = newRadius;
        drawCircle(myCircle, context);

        // request new frame
        requestAnimFrame(function() {
            updateCircle(myCircle, canvas, context, startTime, currentRadFor(myCircle));
            // updateCircRadi();
        });
    }

    function animateTimeBar(myRectangle, canvas, context, startTime) {
        // update
        var time = (new Date()).getTime() - startTime;

        var linearSpeed = 20;
        // pixels / second
        var newX = linearSpeed * time / 1000;

        if (newX < canvas.width - myRectangle.width - myRectangle.borderWidth / 2) {
            myRectangle.x = newX;
        } else {
            timer_done = true;
        }

        // clear
        // context.clearRect(0, 0, canvas.width, canvas.height);

        drawRectangle(myRectangle, context);

        // request new frame
        requestAnimFrame(function() {
            animateTimeBar(myRectangle, canvas, context, startTime);
            // updateCircRadi();
        });
    }

    // find the canvas(s)
    var canvas         = document.getElementById('myCanvas');
    var timelineCanvas = document.getElementById('timelineCanvas');
    console.log(canvas);
    console.log(timelineCanvas);

    // access the 2d context (think of it as the brush)
    var context = canvas.getContext('2d');
    var timelineContext = timelineCanvas.getContext('2d');

    // render graphics (x, y, width, height)
    // context.fillStyle = 'Green';
    // context.fillRect(300, 200, 200, 100);

    // changing brush color
    context.fillStyle = '#79BD9A';

    // (x, y, radius, start ∠, end ∠, antiClockwise)

    // left, big
    context.beginPath();
    context.arc(200, 200, 100, 0, 2 * Math.PI, false);
    context.closePath();
    context.fill();

    var circPlayer1Mellow = {
        x: 200,
        y: 200,
        radius: 100,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        antiClockwise: false,
        color: "#79BD9A"
    };

    // right, big
    context.beginPath();
    context.arc(600, 200, 150, 0, 2 * Math.PI, false);
    context.closePath();
    context.fill();

    var circPlayer2Mellow = {
        x: 600,
        y: 200,
        radius: 150,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        antiClockwise: false,
        color: "#79BD9A"
    };

    // changing brush color
    context.fillStyle = '#0B486B';

    var circPlayer1Conc = {
        x: 200,
        y: 200,
        radius: 50,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        antiClockwise: false,
        color: "#0B486B"
    };

    var circPlayer2Conc = {
        x: 600,
        y: 200,
        radius: 50,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        antiClockwise: false,
        color: "#0B486B"
    };

    drawCircle(circPlayer1Conc, context)
    drawCircle(circPlayer2Conc, context)

    var myRectangle = {
        x: 0,
        y: 0,
        width: 33,
        height: 75,
        borderWidth: 5
    };

    drawRectangle(myRectangle, timelineContext);

    // wait one second before starting animation
    setTimeout(function() {
        var startTime = (new Date()).getTime();
        animateTimeBar(myRectangle, timelineCanvas, timelineContext, startTime);
        // updateCircle(circPlayer2Conc, canvas, context, startTime, circPlayer2Conc.radius);
        updateCanvas(canvas, context, startTime);
    }, 500); // 2DO: change to 30000?
};
