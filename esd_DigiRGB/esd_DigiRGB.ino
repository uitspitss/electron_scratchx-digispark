#define USB_CFG_DEVICE_NAME     'D','i','g','i','B','l','i','n','k'
#define USB_CFG_DEVICE_NAME_LEN 9
#include <DigiUSB.h>
byte in = 0;
int blue = 0;
int red = 0;
int green = 0;
int next = 0;
unsigned long breakTime = 0;
int waitTime = 10; // [sec]

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
  if (DigiUSB.available() > 0) {
    breakTime = millis();
      in = 0;
      in = DigiUSB.read();
    if (next == 0){
      if(in == 115){
        next = 1;
        DigiUSB.println("Start");
      }
    }
    else if (next == 1){
      red = in;
      DigiUSB.print("Red ");
      DigiUSB.println(in,DEC);
      next = 2;
    }
    else if (next == 2){
      green = in;
      DigiUSB.print("Green ");
      DigiUSB.println(in,DEC);
      next = 3;
    }
    else if (next == 3){
      blue = in;
      DigiUSB.print("Blue ");
      DigiUSB.println(in,DEC);
      next = 0;
    }
  } else {
    if(millis() - breakTime > waitTime * 1000){
      /* loop function */
      red += 1;
      int _r = random(0,100); int _g = random(0,100); int _b = random(0,100);
      red = _r; green = _g; blue = _b;
      DigiUSB.delay(3000);
    }
  }
  analogWrite(0,red);
  analogWrite(1,green);
  setBlue();
}

void setBlue(){
  if(blue == 0){
    digitalWrite(2,LOW);
    return;
  }
  else if(blue == 255){
    digitalWrite(2,HIGH);
    return;
  }

  // On period
  for (int x=0;x<blue;x++){
    digitalWrite(2,HIGH);
  }

  // Off period
  for(int x=0;x<(255-blue);x++){
    digitalWrite(2,LOW);
  }
}
