var lastMsgEl = null;
var startstartll;
if (document.readyState != 'loading') onDocumentReady();
else document.addEventListener('DOMContentLoaded', onDocumentReady);

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

var start = null;
var time = 0;

function printDuration() {
  if (start == null) {
    time = 0;
    document.body.style.backgroundColor = 'white';

    start = setInterval(function () {
      time += 1;
      document.getElementById('sendForm').innerHTML = time;
    }, 1000);
  }
}

function stop() {
  clearInterval(start);
  start = null;
  document.getElementById('sendForm').innerHTML = '0';
  if (time > 20) {
    document.body.style.backgroundColor = 'green';
  }
  else {
    document.body.style.backgroundColor = 'red';

  }
}