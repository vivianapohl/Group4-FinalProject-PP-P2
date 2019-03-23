var lastMsgEl = null;
if (document.readyState != 'loading') onDocumentReady();
else document.addEventListener('DOMContentLoaded', onDocumentReady);

function handleCommand(d) {
//Klara added colors and senser values printed out
//lastMsgEl.innerHTML =  `text: ${d.text} <br />int: ${d.integer} <br />float: ${d.float}`;
if (d.float >= 500 && d.float < 600) {
    document.body.style.backgroundColor = "#ff3585"; //Pink
    lastMsgEl.innerHTML = "Sensor value is: " + d.float;
} else if (d.float >= 600 && d.float < 700) {
        document.body.style.backgroundColor = "#4B0082"; //Purple
        lastMsgEl.innerHTML = "Sensor value is: " + d.float;
    } else if (d.float >= 700 && d.float < 800) {
        document.body.style.backgroundColor = "#0000FF"; //Blue
        lastMsgEl.innerHTML = "Sensor value is: " + d.float;
    } else if (d.float >= 800 && d.float < 900) {
        document.body.style.backgroundColor = "#00FF00"; //Green
        lastMsgEl.innerHTML = "Sensor value is: " + d.float;
    } else if (d.float >= 900 && d.float < 1000) {
        document.body.style.backgroundColor = "#FFFF00"; //Yellow
        lastMsgEl.innerHTML = "Sensor value is: " + d.float;
    } else if (d.float >= 1000 && d.float < 1500) {
        document.body.style.backgroundColor = "#FF7F00"; //Orange
        lastMsgEl.innerHTML = "Sensor value is: " + d.float;
 } else {
    document.body.style.backgroundColor = "#FF0000"; //Red
    lastMsgEl.innerHTML = "Sensor value is: " + d.float;
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
                    //Harald fixade bugg
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