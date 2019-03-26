var lastMsgEl = null;
if (document.readyState != 'loading') onDocumentReady();
else document.addEventListener('DOMContentLoaded', onDocumentReady);

function handleCommand(d) {
//Group tweeked function to add colors depending on sensor value and print the current value
if (d.float >= 200 && d.float < 300) {
    document.body.style.backgroundColor = "#022c7d"; //Blue
    lastMsgEl.innerHTML = "Sensor value is: " + d.float;
} else if (d.float >= 300 && d.float < 400) {
        document.body.style.backgroundColor = "#01545a"; //Teal
        lastMsgEl.innerHTML = "Sensor value is: " + d.float;
} else if (d.float >= 500 && d.float < 600) {
    document.body.style.backgroundColor = "#017351"; //Green
    lastMsgEl.innerHTML = "Sensor value is: " + d.float;
} else if (d.float >= 600 && d.float < 700) {
        document.body.style.backgroundColor = "#fbbf45"; //Yellow
        lastMsgEl.innerHTML = "Sensor value is: " + d.float;
} else if (d.float >= 700 && d.float < 800) {
        document.body.style.backgroundColor = "ef6a32"; //Orange
        lastMsgEl.innerHTML = "Sensor value is: " + d.float;
} else if (d.float >= 800 && d.float < 900) {
        document.body.style.backgroundColor = "#ed0345"; //Red
        lastMsgEl.innerHTML = "Sensor value is: " + d.float;
} else if (d.float >= 900 && d.float < 1000) {
        document.body.style.backgroundColor = "#a12a5e"; //Pink-ish
        lastMsgEl.innerHTML = "Sensor value is: " + d.float;
} else if (d.float >= 1000 && d.float < 1500) {
        document.body.style.backgroundColor = "#710162"; //Purple
        lastMsgEl.innerHTML = "Sensor value is: " + d.float;
} else {
    document.body.style.backgroundColor = "#26294a"; //Dark Blue
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
                    //Group fixed bug
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