Sources: https://create.arduino.cc/projecthub/karmette/basic-led-setup-for-beginners-0a124a
        https://www.instructables.com/id/How-to-use-a-vibration-sensor-shake-switch-Arduino/

int LED = 13; //Buzzer connected to pin 8 of Arduino uno / mega
int sensor;           //Variable to store analog value (0-1023)

void setup()
{
	Serial.begin(9600);      //Only for debugging
	pinMode(LED, OUTPUT);
}

void loop()
{
	sensor = analogRead(A0);
	//While sensor is not moving, analog pin receive 1023~1024 value
	if (sensor>700){
	digitalWrite(LED, HIGH);

Serial.print("Sensor Value: ");
	Serial.println(sensor);
	}
	
	else{ 
		digitalWrite(LED, LOW);
		Serial.print("Sensor Value: ");
		Serial.println(sensor);
	}
}