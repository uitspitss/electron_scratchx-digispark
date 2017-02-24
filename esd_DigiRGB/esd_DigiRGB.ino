#define USB_CFG_DEVICE_NAME     'D','i','g','i','B','l','i','n','k'
#define USB_CFG_DEVICE_NAME_LEN 9
#include <DigiUSB.h>
byte in = 0;
int b = 0;
int r = 0;
int g = 0;
int next = 0;
unsigned long bt = 0; // break time [sec]
int wt = 10; // wait time [sec]

void setup() {
  DigiUSB.begin();
  pinMode(0,OUTPUT);
  pinMode(1,OUTPUT);
  pinMode(2,OUTPUT);
}

void loop() {
  setBlue();
  DigiUSB.refresh();
  setBlue();
  if(DigiUSB.available() > 0){
    bt = millis();
    in = 0;
    in = DigiUSB.read();
    if (n == 0){
      if(in == 115){
        n = 1;
        DigiUSB.println("Start");
      }
    }
    else if (n == 1){
      r = in;
      DigiUSB.print("R:");
      DigiUSB.println(in,DEC);
      n = 2;
    }
    else if(n == 2){
      g = in;
      DigiUSB.print("G:");
      DigiUSB.println(in,DEC);
      n = 3;
    }
    else if(n == 3){
      b = in;
      DigiUSB.print("B:");
      DigiUSB.println(in,DEC);
      n = 0;
    }
  }
  if(millis() - bt > wt * 1000){
    /* loop function */
    r = random(0,100);
    g = random(0,100);
    b = random(0,100);
    DigiUSB.delay(3000);
  }
  analogWrite(0,red);
  analogWrite(1,green);
  setBlue();
}

void setBlue(){
  if(b == 0){
    digitalWrite(2,LOW);
    return;
  }
  else if(b == 255){
    digitalWrite(2,HIGH);
    return;
  }

  // On period
  for (int x=0;x<b;x++){
    digitalWrite(2,HIGH);
  }

  // Off period
  for(int x=0;x<(255-b);x++){
    digitalWrite(2,LOW);
  }
}
