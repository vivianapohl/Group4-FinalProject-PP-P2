# Group4-FinalProject-PP-P2


**What the project does**
The demo consists of three bits: an Arduino sketch, a Node.js app, and a web app.
A Node.js app connects to the computer's serial port.

This project is based on a vibration sensor which is sending data from the Arduino monitor through the serial port to the local host server, collecting the values of the data and runs it along with the code, and executes it in the browser (server).

The result is the visualization of the values from the sensor, every hundred has its own color representation.
Value: Less than 200 and more than 1100 displays dark blue color
Value: 200-300 displays blue color
Value: 300-400 displays teal color
Value: 400-500 displays green color
Value: 500-600 displays yellow color
Value: 600-700 displays orange color
Value: 700-800 displays red color
Value: 800-900 displays pink color
Value: 900-1100 displays purple color

**The presented code is based on:**
https://github.com/ClintH/interactivity/tree/master/websockets/serial-bridge
https://www.instructables.com/id/How-to-use-a-vibration-sensor-shake-switch-Arduino/



**Why the project is useful**
“Bicycle fatalities make up 8% of the total number of road accident fatalities in 2016 in the EU countries” (source https://ec.europa.eu/transport/road_safety/sites/roadsafety/files/pdf/statistics/dacota/bfs20xx_cyclists.pdf).
Apart from the deaf community, more and more people are using headphones every day and are not always aware of their surroundings for this reason. A warning light in additional to the sound would draw more attention to the biker and potentially prevent accidents from happening. 


**What is the project exploring**
The prototype is based on the idea that a bell on a bike also needs light to signalize a warning to other bikers, cars and pedestrians. This way non hearing people will also be aware of the presence of the biker. The vibration sensor can detect the vibration of the bell when the biker is using it and it will fire an array of colors from the lamp.
The project is exploring the relation between the vibration values and the colors, each value has its own color connected to it. This gives the user a clear, visual feedback (also printed out in the browser) on which value the sensor is sensing.

**How users can get started with the project:**
1. Run `npm install`
2. Upload _Arduino\Arduino.ino_ to your Arduino
3. Open the serial monitor and ensure that you're getting occasional data from the Arduino. Once satisfied, close the monitor so the port is available again. If you're getting gibberish, double check to make sure the baud rate of the serial monitor is 115,200 (set in the Arduino sketch)
4. Start the Node.js sketch: `node app`. Since you didn't specify which serial port represents the Arduino, you'll get a list of ports displayed. Once you identify the right port, run it again with the port. On Windows this might be something like `node app com5` or on a Mac: `node app /dev/tty.usbmodem1411`. The port name is the often the same or similar to what shows up in the Arduino IDE.
5. Once started, you'll see the same periodic data showing up in the terminal, yay - data is being piped from the Arduino to browser land.
6. In your browser, open up `http://localhost:4000`. You will be able to see different background colors depending on the value of the vibration sensor. 

**Who maintains and contributes**

  - Farbod Hashemian
  - Klara Törnquist
  - Malin Benson
  - Mihhail Korot
  - Viviana Pohl
