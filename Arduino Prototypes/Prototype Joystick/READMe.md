Code Retrieved from https://create.arduino.cc/projecthub/Treebug842/simple-joystick-with-led-64c6d1

---------------------------

int UD = 0;
int LR = 0;
int DWN = 13;
int UP = 12;
int LEFT = 11;
int RT = 10;
int IUP= A0;
int ILR= A1;
int MID = 10;
int LRMID = 0;
int UPMID = 0;

void setup(){

pinMode(DWN, OUTPUT);
pinMode(UP, OUTPUT);
pinMode(LEFT, OUTPUT);
pinMode(RT, OUTPUT);
digitalWrite(DWN, HIGH);
digitalWrite(UP, HIGH);
digitalWrite(LEFT, HIGH);
digitalWrite(RT, HIGH);
LRMID = analogRead(ILR);
UPMID = analogRead(IUP); }

void loop(){

UD = analogRead(IUP);
LR = analogRead(ILR);

if(UD < UPMID - MID){
digitalWrite(DWN, HIGH);
}else{
digitalWrite(DWN, LOW);
}

if(UD > UPMID + MID)
{ digitalWrite(UP, HIGH);
}else{
digitalWrite(UP, LOW);
}

if(LR < LRMID - MID){
digitalWrite(LEFT, HIGH);
}else{
digitalWrite(LEFT, LOW);
}

if(LR > LRMID + MID){
digitalWrite(RT, HIGH);
}else{
digitalWrite(RT, LOW);
}
delay(400);
}
