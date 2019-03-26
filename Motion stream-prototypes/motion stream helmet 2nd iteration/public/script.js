var socket = null;
var frozen = false;

if (document.readyState != 'loading') ready();
else document.addEventListener('DOMContentLoaded', ready);

function ready() {
  
  document.getElementById('last').addEventListener('click', e=> {
    frozen = !frozen;
    document.getElementById('last').classList.toggle('frozen');
  });
  
    
  initWebsocket();
}

function onData(e) {
  var accel = e.accel;
  var accelGrav = e.accelGrav;
  var rot = e.rot;
  
 // console.log("hello its Clint's code");
  if (!frozen) {
    showData(e);
    colorTheBackground(e);
  }
}

function initWebsocket() {
  const url = 'ws://' + location.host + '/ws';
  socket = new ReconnectingWebsocket(url);

  // Connection has been established
  socket.onopen = function(evt) {
    console.log('Web socket opened: ' + url);
  };

  // Received a message
  socket.onmessage = function(evt) {
    // To convert text back to an object (if it was sent with 'sendObject'):
    var o = JSON.parse(evt.data);
    onData(o);
  };
}

//Function for colors ALPHA added by group
function colorTheBackground(event){
  //Group added statement to "reset" the column when the value is changed
  document.getElementById("column1").style.backgroundColor = "white";
  document.getElementById("column2").style.backgroundColor = "white";
  document.getElementById("column3").style.backgroundColor = "white";
  document.getElementById("column1").innerHTML = "";
  document.getElementById("string2").innerHTML = "<h1>motion-stream</h1>";
  document.getElementById("column3").innerHTML = "";
//Group added conditional to change colors according to value, also prints direction
  if (event.rot.alpha > 60 && event.rot.alpha < 120) {
    document.getElementById("column1").style.backgroundColor = "cyan";
    document.getElementById("column1").innerHTML = "<h1>going left</h1>";
  } else if (event.rot.alpha < 30 || event.rot.alpha > 330) {
    document.getElementById("column2").style.backgroundColor = "magenta";
    document.getElementById("string2").innerHTML = "<h1>going middle</h1>";
  } else if (event.rot.alpha > 240 && event.rot.alpha < 300) {
    document.getElementById("column3").style.backgroundColor = "yellow";
    document.getElementById("column3").innerHTML = "<h1>going right</h1>";
  }
};

function showData(m) {
  let html = 'accel';
  html += '<table align="center"><tr><td>' + m.accel.x.toFixed(3) + '</td><td>' + m.accel.y.toFixed(3) + '</td><td>' + m.accel.z.toFixed(3) + '</tr></table>';
  html += '</table>';
  
  html += 'rot';
  html += '<table align="center"><tr><td>' + m.rot.alpha.toFixed(3) + '</td><td>' + m.rot.beta.toFixed(3) + '</td><td>' + m.rot.gamma.toFixed(3) + '</tr></table>';
  
  html += 'rotMotion';
  html += '<table align="center"><tr><td>' + m.rotMotion.alpha.toFixed(3) + '</td><td>' + m.rotMotion.beta.toFixed(3) + '</td><td>' + m.rotMotion.gamma.toFixed(3) + '</tr></table>';
  
  html += 'accelGrav';
  html += '<table align="center"><tr><td>' + m.accelGrav.x.toFixed(3) + '</td><td>' + m.accelGrav.y.toFixed(3) + '</td><td>' + m.accelGrav.z.toFixed(3) + '</tr></table>';
  html += '</table>';
  document.getElementById('last').innerHTML = html;
}