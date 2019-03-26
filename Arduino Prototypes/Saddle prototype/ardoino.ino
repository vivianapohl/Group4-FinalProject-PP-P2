// EduIntro - Version: Latest 
#include <EduIntro.h>
#include <pitches.h>

/*Turns the light on when "button" is pressed = when on the bikesaddle. When released a delay of the program is invoked making the light 
stay on even if button / saddle connection is lost. It will do this for a duration of time before turning the light off. */

Led led(D9);
Button btn(D8);


int val = 0;     // variable for reading the pin status

void setup() {
}

void loop(){ // read input value
if (btn.released())
    delay(3000);
  if (btn.held()) {         // check if the input is HIGH (button released)
    led.on();  // turn LED ON
  } else {
    led.off(); // turn LED OFF
  }
}