/* Since the code for the motion-stream server.js and serial-bridge app.js are almost identical and only difference
 is in the server they use and serial-bridge has some code for handling port activity. I took serial bridge as a base,
 because it has more node modules to cover port code part and added the the missing code for running the the server on
 port 8080. */ 

// to connect write node app in terminal and connect it to the arduino, open the via websocket on your phone :8080.
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var SerialPort = require('serialport');
var expressWs = require('express-ws');

var index = require('./routes/index');
var users = require('./routes/users');

var ews = expressWs(express());
var app = ews.app;

app.ws('/serial', function(ws, req) {
  ws.on('message', function(msg) {
    // Received a message via websocket (ie, from the browser)
    // send it to the serial port
    console.log("Ws received: " + msg);

    var clients = ews.getWss('/ws').clients;
    clients.forEach(c=> {
      c.send(msg);
    });

    port.write(msg + "\r\n");
    port.drain();
  });
});
var serialWs = ews.getWss('/serial');

//var expressWs = require('express-ws')(app);
app.use(require('middleware-static-livereload')({
  documentRoot: 'public/'
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  if (err.status)
    res.sendStatus(err.status);
  else
    res.sendStatus(500);
});

var port = process.env.PORT ? process.env.PORT : 8080;
app.listen(port);
console.log('Webserver started on ' + port);
module.exports = app;

process.argv.forEach(function (val, index, array) {
  if (index >= 2) portArg = val;
  else portArg = "";
});

if (portArg.length == 0) {
  SerialPort.list(function (err, ports) {
    console.log("Here are the serial ports on your system. Find your Arduino and pass that as cmd line argument to this app");
    ports.forEach(function(port) {
        console.log(port.comName, " - ", port.manufacturer);
    });
    process.exit();
  });
  return;
}

var parser = new SerialPort.parsers.Readline;
var port = new SerialPort(portArg, {baudRate:115200}, function (err) {
  if (err) {
      console.log('Could not open port.\n ', err.message);
      process.exit();
  } else {
      console.log("Opened port, now waiting for client connection.")
      console.log("Use CTRL+C to stop.");
  } 
});
port.on('close', function(err) {
  console.log('Port closed ' + err);
})
port.on('error', function(err){
  console.log('Port error: ' + err);
})
port.pipe(parser);
parser.on('data', function(data) {
 console.log("Serial Received: " + data);

 // Send the text we received on the serial port to all clients
 if (serialWs) {
    serialWs.clients.forEach(function(client) {
      try {
        client.send(data);
      } catch (e) {}
    });
  }
});

