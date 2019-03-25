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
    going(e);
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
/*function colorTheBackground(event){
  if (event.rot.alpha > 60 && event.rot.alpha < 80) {
    document.body.style.backgroundColor = "red";
  } else if (event.rot.alpha > 280 && event.rot.alpha < 300) {
    document.body.style.backgroundColor = "blue";
  } else if (event.rot.alpha > 170 && event.rot.alpha < 190) {
    document.body.style.backgroundColor = "yellow";
  } else {
    document.body.style.backgroundColor = "green";
  }
};

//Function for console.log:ing rotation added by group
function going(event) {
  if (event.rot.alpha > 60 && event.rot.alpha < 80) {
    console.log("going left")  
  } else if (event.rot.alpha > 280 && event.rot.alpha < 300) {
    console.log("going right")
  } else if (event.rot.alpha > 170 && event.rot.alpha < 190) {
    console.log("going back")
  } else {
  console.log("going straight")
  }
};*/

//Function for colors BETA added by group
/*function colorTheBackground(event){
  if (event.rot.beta > 40 && event.rot.beta < 100) {
    document.body.style.backgroundColor = "pink";
  } else if (event.rot.beta < -155 && event.rot.beta > -180) {
    document.body.style.backgroundColor = "limegreen";
  } else if (event.rot.beta > 155 && event.rot.beta < 180) {
    document.body.style.backgroundColor = "purple";
  } else {
    document.body.style.backgroundColor = "turquoise";
  }
};

//Function for console.log:ing rotation added by group
function going(event) {
  if (event.rot.beta > 40 && event.rot.beta < 100) {
    console.log("going pink")  
  } else if (event.rot.beta < -155 && event.rot.beta > -180) {
    console.log("going green")
  } else if (event.rot.beta > 155 && event.rot.beta < 180) {
    console.log("going purple")
  } else {
  console.log("going turquoise")
  }
};*/

//Function for colors GAMMA added by group
function colorTheBackground(event){
  if (event.rot.gamma < -30 && event.rot.gamma > -40) {
    document.body.style.backgroundColor = "cyan";
  } else if (event.rot.gamma < -40 && event.rot.gamma > -89) {
    document.body.style.backgroundColor = "navy";
  } else if (event.rot.gamma > 30 && event.rot.gamma < 40) {
    document.body.style.backgroundColor = "yellow";
  } else if (event.rot.gamma > 40 && event.rot.gamma < 89) {
    document.body.style.backgroundColor = "orange";
  } else {
    document.body.style.backgroundColor = "magenta";
  }
};

//Function for console.log:ing rotation added by group
function going(event) {
  if (event.rot.gamma < -60 && event.rot.gamma > -90) {
    console.log("going blue")  
  } else if (event.rot.gamma < -1 && event.rot.gamma > -40) {
    console.log("going brown")
  } else if (event.rot.gamma > 60 && event.rot.gamma < 90) {
    console.log("going orange")
  } else {
  console.log("going magenta")
  }
};

function showData(m) {
  let html = 'accel';
  html += '<table><tr><td>' + m.accel.x.toFixed(3) + '</td><td>' + m.accel.y.toFixed(3) + '</td><td>' + m.accel.z.toFixed(3) + '</tr></table>';
  html += '</table>';
  
  html += 'rot';
  html += '<table><tr><td>' + m.rot.alpha.toFixed(3) + '</td><td>' + m.rot.beta.toFixed(3) + '</td><td>' + m.rot.gamma.toFixed(3) + '</tr></table>';
  
  html += 'rotMotion';
  html += '<table><tr><td>' + m.rotMotion.alpha.toFixed(3) + '</td><td>' + m.rotMotion.beta.toFixed(3) + '</td><td>' + m.rotMotion.gamma.toFixed(3) + '</tr></table>';
  
  html += 'accelGrav';
  html += '<table><tr><td>' + m.accelGrav.x.toFixed(3) + '</td><td>' + m.accelGrav.y.toFixed(3) + '</td><td>' + m.accelGrav.z.toFixed(3) + '</tr></table>';
  html += '</table>';
  document.getElementById('last').innerHTML = html;
}