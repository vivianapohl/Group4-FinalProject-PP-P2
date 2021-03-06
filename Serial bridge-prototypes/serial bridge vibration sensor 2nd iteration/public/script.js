var lastMsgEl = null;
if (document.readyState != 'loading') onDocumentReady();
else document.addEventListener('DOMContentLoaded', onDocumentReady);

//Group added variable for object
let animation = document.getElementById('animation');

//Group tweeked function to run animation if condition is met and print the current value either way
function handleCommand(d) {
if (d.float < 500) {
    lastMsgEl.innerHTML = "Sensor value is: " + d.float;
    animation.className = "noAnimation";
} else {
    lastMsgEl.innerHTML = "Sensor value is: " + d.float;
    animation.className = "animation";
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
}