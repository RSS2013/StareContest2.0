$(function(){

    var points = {
            alpha : [],
            beta : [],
            delta : [],
            gamma : [],
            theta : []

        },
        types = ['alpha', 'beta', 'delta', 'gamma', 'theta'];


    Muse.connect({
      host: 'http://127.0.0.1',
      port: 8081,
      socket: {
        host: '127.0.0.1',
        ports: {
          client: 3334,
          server: 3333
        }
      }
    });


    /* Muse overrides */

    Muse.relative.brainwave = function(band, obj){
       var value = average(obj);
           points[band].push(value);

        if (points[band].length > 23) {
            points[band].shift();
        }

        updateGraphData();
        graph.update();

        //updatePolarData();
        //polar.update();
    };


    Muse.muscle.blink = function(obj){

        if (obj[1] === 1){
            $('.eyes img').toggle();

            setTimeout(function(){

                $('.eyes img').toggle();
            }, 200);
        }

    }


    /* Helpers */
    var average = function(arr){
        var length = arr.length,
            result = 0,
            num = 0,
            i;

        for (i = 1; i < length; i++){
            result += arr[i];
            num++;
        }

        return result/num;
    };


    var updateGraphData = function(){

        var length, i, j;

        for (i=0; i < 5; i++) {

            length = graph.datasets[i].points.length

            for (j = 0 ; j < length; j++ ){
                graph.datasets[i].points[j].value = points[types[i]][j] || 0.5;
            }
        }
    };

    /* All chart.js logic is below here */

    var $canvas = $('#line'),
        ctx = $canvas.get(0).getContext('2d'),
        //$polarCanvas = $('#polar'),
        //pctx = $polarCanvas.get(0).getContext('2d'),
        startingData = {
            labels: ['','','','','','','','','','','','','','','','','','','','','','',''],
            datasets: [
              {
                  label: 'Alpha',
                  fillColor: "transparent",
                  strokeColor: "#52b9e9",
                  pointColor: "#80CFF4",
                  pointStrokeColor: "#fff",
                  data: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
              },
              {
                  label: 'Beta',
                  fillColor: "transparent",
                  strokeColor: "#25b9a4",
                  pointColor: "#57E0CD",
                  pointStrokeColor: "#fff",
                  data: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]              },
              {
                  label: 'Delta',
                  fillColor: "transparent",
                  strokeColor: "#ffdf7c",
                  pointColor: "#ffdf7c",
                  pointStrokeColor: "#fff",
                  data: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]              },
              {
                  label: 'Gamma',
                  fillColor: "transparent",
                  strokeColor: "#7c73b4",
                  pointColor: "#7c73b4",
                  pointStrokeColor: "#fff",
                  data: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
              },
              {
                  label: 'Theta',
                  fillColor: "transparent",
                  strokeColor: "#d22630",
                  pointColor: "#d22630",
                  pointStrokeColor: "#fff",
                  data: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
              },
              {
                  label: 'Concentration',
                  fillColor: "transparent",
                  strokeColor: "#F79178",
                  pointColor: "#F79178",
                  pointStrokeColor: "#fff",
                  data: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
              },
              {
                  label: 'Mellow',
                  fillColor: "transparent",
                  strokeColor: "#798883",
                  pointColor: "#798883",
                  pointStrokeColor: "#fff",
                  data: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
              }
              ]
        };

    var polarData = [{
            value: 0.5,
            color: '#52b9e9',
            label: 'Alpha'
        },{
            value: 0.5,
            color: '#25b9a4',
            label: 'Beta'
        },{
            value: 0.5,
            color: '#ffdf7c',
            label: 'Delta'
        },{
            value: 0.5,
            color: '#7c73b4',
            label: 'Gamma'
        },{
            value: 1.0,
            color: '#F79178',
            label: 'Concentration'
        },{
            value: 1.0,
            color: '#798883',
            label: 'Mellow'
        }
        ]

    var graph = new Chart(ctx).Line(startingData, {
            animationSteps: 1,
            label: "",
            animation: true,
            responsive: true,
            maintainAspectRatio: false
        });

    $canvas.after($(graph.generateLegend()));


   /* var polar = new Chart(pctx).PolarArea(polarData, {
        scaleOverride: true,
        scaleSteps : 0.5,
        scaleStepWidth: 1,
        scaleStartValue: 0
    });

    $polarCanvas.after($(polar.generateLegend()));*/

    var updatePolarData = function(){
        var i;

        for ( i=0; i<5; i++){
            polar.valueOf().segments[i].value = points[types[i]][points[types[i]].length - 1];
        }
    };


});
