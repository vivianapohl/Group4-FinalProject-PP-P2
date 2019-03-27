/*Simple arduino code witch mostly works on serial.write and serial read function to monitor my actions.*/
int ledPin = 2;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("Press On to turn on the LED!");
}

void loop(){
  if (Serial.available()){
    char ch = Serial.read();
    if (ch == 'a'){
      digitalWrite(ledPin, HIGH);
      Serial.println("You have turned on the LED!");
      Serial.println("Press Off to turn off the LED!");
    }
    if (ch == 'b'){
      digitalWrite(ledPin, LOW);
      Serial.println("You have turned off the LED!");
      Serial.println("Press On to turn on the LED!");
    }
  }
}
