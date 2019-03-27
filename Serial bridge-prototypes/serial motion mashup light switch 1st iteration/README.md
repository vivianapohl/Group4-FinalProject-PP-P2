What the sketch does

This sketch is exploring sending commands from a a localhost over a serialport to an Arduino to turn on/off an LED light. It is more of a 3rd iteration to a our serial-bridge prototype witch adds so called remote control to a LED light and serves as first iteration to our attempts to connect our motion-stream prototypes to an Arduino board.

How users can get started with the project:

1. Run npm install in the terminal to install all necessary to run the code.
2. Upload code from arduino/LightSwitch.ino to your Arduino board.
3. You can check wether the code is working by righting a or b to Arduinos serial monitor.
4. Write npm start to boot up your server. The port name is: your ip address :8080.
5. If it is up and running and your phone is connected to same Wi-Fi as your computer you can enter the server and control LED from you phone remotely.

Architecture  

The demo consists of three bits: an Arduino sketch, a Node.js app, and a web app.

The Arduino sketch sends/receives via serial over USB
A Node.js app connects to the computer's serial port. It's a webserver with websockets enabled. When serial data is received from the Arduino, it broadcasts it to all clients connected via websockets. When data is received on the websocket, it sends it to the Arduino. You can open the connection to your Node.js server from any number of web browsers, including mobile devices!

The presented code is based on and Read more:

https://github.com/ClintH/interactivity

More on:

WebSockets
Bundles:

reconnecting-websocket wrapper (v3.2.2)
Credits:

Arduino serial I/O: http://forum.arduino.cc/index.php?topic=396450