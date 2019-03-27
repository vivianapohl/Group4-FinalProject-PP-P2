What the sketch does

This project is based on a FSR sensor which is sending data from the Arduino monitor through the serial port to the local host server, collecting the values of the data and runs it along with the code, and executes it in the browser (server). Depending on applied pressure and duration of applied pressure the background color of the local host will change.

The idea behind this sketch is a workout bicycle saddle. When sitting on the saddle = applying pressure to the sensor, a timer will start. If the pressure is released before a decided amount of time (10 sec, could be changed to whatever preferred) background color turns red encouraging you to sit / apply pressure longer. If you sit over 10 sec it will become green, implying you have sat long enough.

Source for set up of FSR sensor (without LED in this case):  https://www.instructables.com/id/How-to-use-a-Force-Sensitive-Resistor-Arduino-Tuto/

How users can get started with the project:

(from Clint's ReadMe)

Run npm install
Upload Arduino\Arduino.ino to your Arduino
Open the serial monitor and ensure that you're getting occasional data from the Arduino. Once satisfied, close the monitor so the port is available again. If you're getting gibberish, double check to make sure the baud rate of the serial monitor is 115,200 (set in the Arduino sketch)
Start the Node.js sketch: node app. Since you didn't specify which serial port represents the Arduino, you'll get a list of ports displayed. Once you identify the right port, run it again with the port. On Windows this might be something like node app com5 or on a Mac: node app /dev/tty.usbmodem1411. The port name is the often the same or similar to what shows up in the Arduino IDE.
Once started, you'll see the same periodic data showing up in the terminal, yay - data is being piped from the Arduino to browser land.
In your browser, open up http://localhost:4000. This will allow you to send commands to the Node.js server, which in turn forwards it to the Arduino. Likewise, messages sent by the Arduino are displayed in the web page.
Architecture

The demo consists of three bits: an Arduino sketch, a Node.js app, and a web app.

The Arduino sketch sends/receives via serial over USB
A Node.js app connects to the computer's serial port. It's a webserver with websockets enabled. When serial data is received from the Arduino, it broadcasts it to all clients connected via websockets. When data is received on the websocket, it sends it to the Arduino. You can open the connection to your Node.js server from any number of web browsers, including mobile devices!

Serial commands

Apply pressure to FSR sensor to activate counter, and in extension change colors of the local host.

The presented code is based on and Read more:

https://github.com/ClintH/interactivity

More on:

WebSockets
Bundles:

reconnecting-websocket wrapper (v3.2.2)
Credits:

Arduino serial I/O: http://forum.arduino.cc/index.php?topic=396450