#define USB_CFG_DEVICE_NAME     'D','i','g','i','B','l','i','n','k'
#define USB_CFG_DEVICE_NAME_LEN 9
#include <DigiUSB.h>
#include <Adafruit_NeoPixel.h>

byte in = 0;
int blue = 0;
int red = 0;
int green = 0;
int next = 0;
unsigned long breakTime = 0;
int waitTime = 10; // [sec]

#define PIN            1
#define NUMPIXELS      1
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_RGB + NEO_KHZ800);

void setup(){
  pixels.begin();
  pixels.show();

  DigiUSB.begin();
}

void loop(){
  DigiUSB.refresh();
  if (DigiUSB.available() > 0) {
    breakTime = millis();
      in = 0;
      in = DigiUSB.read();
    if(next == 0){
      if(in == 115){
        next = 1;
        DigiUSB.println("Start");
      }
    }
    else if(next == 1){
      red = in;
      DigiUSB.print("Red ");
      DigiUSB.println(in,DEC);
      next = 2;
    }
    else if(next == 2){
      green = in;
      DigiUSB.print("Green ");
      DigiUSB.println(in,DEC);
      next = 3;
    }
    else if(next == 3){
      blue = in;
      DigiUSB.print("Blue ");
      DigiUSB.println(in,DEC);
      next = 0;
    }
    if(next == 0){
      pixels.setPixelColor(0, pixels.Color(red, green, blue));
      pixels.show();
    }
  }
  DigiUSB.delay(100);
}
