var Myo = require('myo');

Myo.onError = function(){
    console.log("Woah, couldn't connect to Myo Connect");
}

//var myMyo = Myo.create();
//var myMyo = Myo.create(0, {armbusy_threshold : 10});
var myMyo = Myo.create();


console.log("my myo is " , myMyo);
console.log("is this connected?:", myMyo.connected);
console.log("is this locked?", myMyo.unlocked);
console.log("myo id" , myMyo.id);
//myMyo.vibrate('long');
//myMyo.vibrate();
//myMyo.open();
//myMyo.opened();
//Example for setting locking policy
myMyo.on('connected', function () {
    myMyo.setLockingPolicy('none');
    console.log("it's connected!");
});


myMyo.on('fist', function(edge){
	console.log('fist');
	//Edge is true if it's the start of the pose, false if it's the end of the pose
    if(!edge) return;
    console.log('Hello Myo!');
    //myMyo.vibrate();

});

// myMyo.on('open', function(edge){
//     if(!edge) return;
//     console.log('open');
//     //myMyo.vibrate();

// });

// myMyo.on('closed', function(edge){
//     if(!edge) return;
//     console.log('closed');
//     //myMyo.vibrate();

// });

// myMyo.on('rest', function(edge){
//     if(!edge) return;
//     console.log('rest');
//     //myMyo.vibrate();

// });


// myMyo.on('gyroscope', function(data){
//     if(data.x > 100){
//         alert('Woah now!');
//     }
//     if(data.y > 111) {
//     	alert("stuff");
//     }
// });
 
 // this is how you fire an event - by sending a trigger. 
 myMyo.on('foobar', function(msg){
    console.log('wooooo', msg)

});

// // trigger tests 
// myMyo.on('tests', function(input){
// 	console.log(input);
//    myMyo.trigger('fist', true);
//    myMyo.trigger('open', true);
//    myMyo.trigger('closed', true);
//    myMyo.trigger('rest', true);
//   // myMyo.trigger('gyroscope',  );

// });

// myMyo.trigger('tests', "Now testing");

