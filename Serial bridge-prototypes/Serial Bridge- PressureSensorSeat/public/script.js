var lastMsgEl = null;
if (document.readyState != "loading") onDocumentReady();
else document.addEventListener("DOMContentLoaded", onDocumentReady);

let startTime = null; 
let endTime = null;
let diff = null;

function start() {
  startTime = new Date();
}

 function end() {
   endTime = new Date();
 }

//Group modified function to show the value of pressure sensor as well as making sure that the background
// of the localhost is white when the code runs over it again
function handleCommand(d) {
 
  lastMsgEl.innerHTML = "sensor value is:" + d.float;
  if (d.float > 100) {
    handlePress(d);
  }
}

// function handlePress (d) {
//    if (d.float < 400) {
//      console.log("Hej");
//      if (startTime) {
//        endTime = new Date();
//        let diff = (endTime.getTime() - startTime.getTime()) / 1000;
//        //diff /= 1000;
//        console.log(diff);

// // if (diff > 10)
// //          //do something
// //          else 
// //          //something else

//          startTime = null;
//      }
//    } else if (d.float > 400) {
//      if (!startTime) {
//        start(); // 00:00:00
//        console.log("Time Stamped");
//      }
//    }
//  }

// function handlePress (d) {
//   while (d.float > 100) { 
//   start();
//   console.log("Timey Time!");
//   if (d.float === 0) {
//   console.log("Oh my!");
//   handleRelease();
//   break;
//   }
//   }
//   }
  
 function handlePress(d) {
 if (startTime == null && d.float > 400) {
 start(); // Time stamp current time (when beginning pressing on the FSR sensor) 
 console.log("TimeWoop")
 } else if (d.float === 0) {
   handleRelease();
   console.log("jasgjas");
 }
 }
 
 } else if (startTime && d.float < 400) {
   end();
   let diff = (endTime.getTime() - startTime.getTime()) / 1000;
   console.log(diff);
 };

  function handleRelease () {
    if (startTime) {
      console.log('you made it!!')
      end();
      diff = (endTime.getTime() - startTime.getTime()) / 1000;
    } else if (diff >= 10) {
      document.body.style.backgroundColor = "green";
      console.log(diff);
    } else {
      document.body.style.backgroundColor = "red";
      console.log(diff);
    }
    }
 



//   if (d.float < 400) {
//      if (startTime) {
//        endTime = new Date();
//        let diff = (endTime.getTime() - startTime.getTime()) / 1000;
//        console.log(diff);
//      }
//      if (diff > 10) {
//        document.body.style.backgroundColor = "green";
//      } else {
//        document.body.style.backgroundColor = "red";
//      }
//     }
//   }
// }




// function handleCommand(d) {
//   //lastMsgEl.innerHTML =  `text: ${d.text} <br />int: ${d.integer} <br />float: ${d.float}`;
//   document.body.style.BackgroundColor = "white";
//   lastMsgEl.innerHTML = "sensor value is:" + d.float;
//   if (d.float > 100 ) {
//       handlePress(d);
//   };
// };

// function handlePress(d) {
//  if (d.float >= 700) {
//     setTimeout(function() {
//      document.body.style.backgroundColor = "green";
//     }, 10000);
//   } else {
//     setTimeout(function() {
//       document.body.style.backgroundColor = "red";
//     }, 4000);
//     clearTimeout(handlePress);
//     document.body.style.backgroundColor = "white";
//     //console.log('hi');
//   }
// };

function onDocumentReady() {
  var socket = new ReconnectingWebsocket("ws://" + location.host + "/serial");
  var sendFormEl = document.getElementById("sendForm");
  var lastMsg = null;
  lastMsgEl = document.getElementById("lastMsg");
  socket.onmessage = function(evt) {
    // Debug: see raw received message
    //console.log(evt.data);

    // Parse message, assuming <Text,Int,Float>
    var d = evt.data.trim();

    if (d.charAt(0) == "<" && d.charAt(d.length - 1) == ">") {
      // Looks legit
      d = d.split(",");
      if (d.length == 3) {
        // Yes, it has three components as we hoped
        handleCommand({
          text: d[0].substr(1),
          integer: parseInt(d[1]),
          //Group fixed bug
          float: parseFloat(d[2].substr(0, d[2].length - 1))
        });
        return;
      }
    }

    // Doesn't seem to be formatted correctly, just display as-is
    if (evt.data != lastMsg) {
      lastMsgEl.innerText = evt.data;
      lastMsg = evt.data;
    }
  };
  socket.onopen = function(evt) {
    console.log("Socket opened");
  };

  sendFormEl.addEventListener("submit", function(evt) {
    evt.preventDefault();
    var send = document.getElementById("sendtoSerial").value;
    socket.send(send);
  });
}
