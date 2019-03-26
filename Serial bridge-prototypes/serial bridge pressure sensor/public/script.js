var lastMsgEl = null;
var startstartll;
if (document.readyState != 'loading') onDocumentReady();
else document.addEventListener('DOMContentLoaded', onDocumentReady);

/*Group changed function to: 
1. Augment text displayed on localhost to show data from pressure sensor on the Arduino
2. If value from pressure sensor is over 500 start a function, otherwise it will cal for another (to stop timer)*/
function handleCommand(d) {
  lastMsgEl.innerHTML =  "sensor value is:" + d.float;
 
  if (d.float > 500) {
    printDuration();
  }
  else {
    stop();
  }
  
}

function onDocumentReady() {
    var socket = new ReconnectingWebsocket("ws://" + location.host + "/serial");
    var sendFormEl = document.getElementById('sendForm');
    var lastMsg = null;
    lastMsgEl = document.getElementById('lastMsg');
    socket.onmessage = function(evt) {
        // Debug: see raw received message
        //console.log(evt.data);
        
        // Parse message, assuming <Text,Int,Float>
        var d = evt.data.trim();
        if (d.charAt(0) == '<' && d.charAt(d.length-1) == '>') {
            // Looks legit
            d = d.split(',');    
            if (d.length == 3) { // Yes, it has three components as we hoped
                handleCommand({
                    text:d[0].substr(1), 
                    integer: parseInt(d[1]), 
                    float: parseFloat(d[2].substr(0,d[2].length-1))
                });
                return;          
            }
        }
        
        // Doesn't seem to be formatted correctly, just display as-is
        if (evt.data != lastMsg) {
            lastMsgEl.innerText =  evt.data;
            lastMsg = evt.data;
        }
    }
    socket.onopen = function(evt) {
        console.log("Socket opened");
    }

    sendFormEl.addEventListener('submit', function(evt) {
        evt.preventDefault();
        var send = document.getElementById('sendtoSerial').value;
        socket.send(send);  
    })
}

/*We declared variables for time-keeping of sensor input, "start" to start the counter, and "time" to store 
the time it was held*/

var start = null;
var time = 0;

/*We created function to be called whn sensor- data is over 500. This will start adding 1 second to 
a "counter" as long as the sensor stays pressed to keep track of time pressed*/ 
function printDuration() {
  if (start == null) {
    time = 0;
    document.body.style.backgroundColor = "white";
    start = setInterval(function () {
      time += 1;
      document.getElementById('sendForm').innerHTML = time;
    }, 1000);
  }
}

/*This clears the time variable when pressure is released and value drops, stopping the timer.
After the pressure is released the function will check if the time it (FSR sensor) was pressed
is over or under 10 seconds. If over 10 seconds the background turns green, if under it turns red -> indicating 
more sitting / exercise is needed. The start variable is also cleared, allowing the functions to start over 
when applying pressure again */
function stop() {
  clearInterval(start);
  start = null;
  document.getElementById('sendForm').innerHTML = '0';
  if (time > 10) {
    document.body.style.backgroundColor = 'green';
  }
  else {
    document.body.style.backgroundColor = 'red';
  }
}