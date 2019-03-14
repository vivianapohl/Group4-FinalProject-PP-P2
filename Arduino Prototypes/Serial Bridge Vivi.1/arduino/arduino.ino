int redLedPin = 2;

void setup()
{
  pinMode(redLedPin, OUTPUT);
  Serial.begin(9600);
  while (!Serial)
    ;
  Serial.println("Enter a to turn on the LED!");
}

void loop()
{
  if (Serial.available())
  {
    char ch = Serial.read();
    if (ch == 'a')
    {
      digitalWrite(redLedPin, HIGH);
      Serial.println("You have turned on the LED!");
      Serial.println("Enter b to turn off the LED!");
    }
    if (ch == 'b')
    {
      digitalWrite(redLedPin, LOW);
      Serial.println("You have turned off the LED!");
      Serial.println("Enter a to turn on the LED!");
    }
  }
}