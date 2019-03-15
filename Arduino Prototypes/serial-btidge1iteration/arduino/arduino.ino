// Serial I/O based on example http://forum.arduino.cc/index.php?topic=396450
//Arduino function code based on: https://www.instructables.com/id/Control-LED-Using-Serial-Monitor/

// Serial communication
const byte numChars = 32;
char receivedChars[numChars];
char tempChars[numChars];
char messageFromPC[numChars] = {0};
int integerFromPC = 0;
float floatFromPC = 0.0;
boolean newData = false;

long lastFakeReport = 0;

enum
{
  MsgAcknowledge, // 0
  MsgError,       // 1
  MsgMove,        // 2
  MsgMoveResult,  // 3
  MsgPosition,    // 4
};

void setup()

{

  pinMode(13, OUTPUT);

  Serial.begin(9600);

  while (!Serial)
    ;

  Serial.println("Input 1 to Turn LED on and 2 to off");
}

void loop()
{

  if (Serial.available())

  {

    int state = Serial.parseInt();

    if (state == 1)

    {

      digitalWrite(13, HIGH);

      Serial.println("Command completed LED turned ON");
    }

    if (state == 2)

    {

      digitalWrite(13, LOW);

      Serial.println("Command completed LED turned OFF");
    }
  }
}

// ---- Serial communication
void report(int code, const char *message)
{
  Serial.print("<");
  Serial.print("ws-bridge,");
  Serial.write(code);
  Serial.write(",");
  Serial.write(message);
  Serial.print(">\r\n");
  Serial.flush();
}

void report(int code, int message)
{
  Serial.print("<");
  Serial.print("ws-bridge,");
  Serial.print(code);
  Serial.print(",");
  Serial.print(message);
  Serial.print(">\r\n");
  Serial.flush();
}

void recvWithStartEndMarkers()
{
  static boolean recvInProgress = false;
  static byte ndx = 0;
  char startMarker = '<';
  char endMarker = '>';
  char rc;

  while (Serial.available() > 0 && newData == false)
  {
    rc = Serial.read();

    if (recvInProgress == true)
    {
      if (rc != endMarker)
      {
        receivedChars[ndx] = rc;
        ndx++;
        if (ndx >= numChars)
        {
          ndx = numChars - 1;
        }
      }
      else
      {
        receivedChars[ndx] = '\0'; // terminate the string
        recvInProgress = false;
        ndx = 0;
        newData = true;
      }
    }

    else if (rc == startMarker)
    {
      recvInProgress = true;
    }
  }
}

void parseData()
{                   // split the data into its parts
  char *strtokIndx; // this is used by strtok() as an index

  strtokIndx = strtok(tempChars, ","); // get the first part - the string
  strcpy(messageFromPC, strtokIndx);   // copy it to messageFromPC

  strtokIndx = strtok(NULL, ",");   // this continues where the previous call left off
  integerFromPC = atoi(strtokIndx); // convert this part to an integer

  strtokIndx = strtok(NULL, ",");
  floatFromPC = atof(strtokIndx); // convert this part to a float
}

void showParsedData()
{
  Serial.print("Message ");
  Serial.println(messageFromPC);
  Serial.print("Integer ");
  Serial.println(integerFromPC);
  Serial.print("Float ");
  Serial.println(floatFromPC);
}
