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
  

  if (!frozen) {
    showData(e);
    shake(e);
    shake2(e);
    shake3(e);
    //leftRight(e);
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
/*
function leftRight(event){
  if (event.rot.gamma > 30 && event.rot.beta < 60){
     console.log('oooooooo')
   } else if (event.rot.gamma < -30 && event.rot.beta > -60){
     console.log('aaaaaaa')
   } else {
     console.log('uuuuuu')
   }
 }
 */
 

 /*Using acceleration to emulate shaking in horizontal direction*/
 function shake(event){
   if (event.accel.x < -30 && event.accel.x > -50){
     console.log('shakalaka')
     document.body.style.backgroundColor ='red'
   } else {
     console.log('boring')
   }
 }

 /*Using acceleration to emulate shaking in vertical direction*/
 function shake2(event){
  if (event.accel.y < -30 && event.accel.y > -50){
    console.log('ooooo')
    document.body.style.backgroundColor ='green'
  } else {
    console.log('boring')
  }
}

/*Using both previous implementations together to calm down the shaking activity, more diagonal motion*/
function shake3(event){
  if (event.accel.x < -20 && event.accel.x > -50 && event.accel.y < -10 && event.accel.y > -50){
    console.log('aaaaaa')
    document.body.style.backgroundColor ='orange'
  } else {
    console.log('boring')
  }
}

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