window.onload = function() {
    "use strict";

    console.log("YO!");

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
                let received_msg;
                received_msg = evt.data;
                console.log(received_msg);
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
        context.fillStyle = '#8ED6FF';
        context.fill();
        context.lineWidth = myRectangle.borderWidth;
        context.strokeStyle = 'black';
        context.stroke();
    }

    function animateTimeBar(myRectangle, canvas, context, startTime) {
        // update
        var time = (new Date()).getTime() - startTime;

        var linearSpeed = 100;
        // pixels / second
        var newX = linearSpeed * time / 1000;

        if (newX < canvas.width - myRectangle.width - myRectangle.borderWidth / 2) {
            myRectangle.x = newX;
        }

        // clear
        // context.clearRect(0, 0, canvas.width, canvas.height);

        drawRectangle(myRectangle, context);

        // request new frame
        requestAnimFrame(function() {
            animateTimeBar(myRectangle, canvas, context, startTime);
        });
    }

    // find the canvas
    var canvas = document.getElementById('myCanvas');

    // access the 2d context (think of it as the brush)
    var context = canvas.getContext('2d');

    // render graphics (x, y, width, height)
    context.fillStyle = 'Green';
    context.fillRect(300, 200, 200, 100);

    // changing brush color
    context.fillStyle = 'Navy';

    // (x, y, radius, start ∠, end ∠, antiClockwise)
    context.arc(200, 200, 50, 0, 2 * Math.PI, false);
    context.fill();

    context.arc(600, 200, 50, 0, 2 * Math.PI, false);
    context.fill();

    var myRectangle = {
        x: 0,
        y: 425,
        width: 100,
        height: 75,
        borderWidth: 5
    };

    drawRectangle(myRectangle, context);

    // wait one second before starting animation
    setTimeout(function() {
        var startTime = (new Date()).getTime();
        animateTimeBar(myRectangle, canvas, context, startTime);
    }, 500);
};
