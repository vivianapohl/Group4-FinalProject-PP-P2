int led1 = 4;
int led2 = 5;
int led3 = 6;
int led4 = 9;
int led5 = 10;

int potValue;
int ledValue; 

void setup() {
}

void loop() {
  potValue = analogRead(0);
  ledValue = map(potValue, 1023, 0, 0, 255);
  analogWrite(led1, ledValue);
   analogWrite(led2, ledValue);
    analogWrite(led3, ledValue);
     analogWrite(led4, ledValue);
     analogWrite(led5, ledValue);
     
}
