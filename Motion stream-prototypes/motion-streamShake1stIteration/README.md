What the sketch does

This example of the motion stream shows how orientation data is send from a mobile device via websockets to a server. At this stage we can indicate users motions on the screen. The second iteration would be connecting the code to the Arduino. This is an example of how a bike lights could be accessed by a user.

How users can get started with the project:

1. Run npm install in the terminal to install all the node modules to run the code.
2. Write npm start to boot up your server. The port name is: your ip address :8080.
3. If it is up and running and your phone is connected to same Wi-Fi as your computer you can enter the server and control LED from you phone remotely.



Architecture

The demo consists of two bits : a mobile device and a server that receives data

the mobile device sends data via a websocket to a server.

the localhost receives the date and is showing it

The presented code is based on and Read more:

https://github.com/ClintH/interactivity

It's also available on Glitch
Device Orientation & Motion (Google)
Device Orientation (MDN)

**Who maintains and contributes**

  - Farbod Hashemian
  - Klara Törnquist
  - Malin Benson
  - Mihhail Korot
  - Viviana Pohl