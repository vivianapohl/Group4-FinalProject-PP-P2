**What the sketch does**

This example of the  motion stream shows how orientation data is send from a mobile device via websockets to a server. 
From there, the server distributes the received data to all connected clients.
The mobile device was implemented into a helmet. 
The second iteration the screen from the localhost is divided into three parts to indicate more clearly the different ways the bike is moving. This is an example of how a bike lamp could work that indicates which way the bike is going

**How users can get started with the project:**

(from clints ReadMe)

1. In the directory you've got this sample:

`$ npm install`

2. This will install the necessary packages from npm.

3.Once set up, you can boot up your server with

`$ npm start`

It will continue running. To stop it again, press CTRL+C (PC) or CMD+C (Mac).



**Architecture**

The demo consists of two bits : a mobile device and a server that receives data 

- the mobile device sends data via a websocket to a server.

- the localhost receives the date and is showing it

**The presented code is based on and Read more:**

https://github.com/ClintH/interactivity

* It's [also available on Glitch](https://glitch.com/edit/#!/remix/ch-motion-data)
* [Device Orientation & Motion](https://developers.google.com/web/fundamentals/native-hardware/device-orientation/) (Google)
* [Device Orientation](https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation) (MDN)




