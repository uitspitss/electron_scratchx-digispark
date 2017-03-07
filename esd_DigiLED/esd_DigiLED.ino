#define USB_CFG_DEVICE_NAME     'D','i','g','i','B','l','i','n','k'
#define USB_CFG_DEVICE_NAME_LEN 9
#include <DigiUSB.h>
#include <Adafruit_NeoPixel.h>

byte in = 0;
int b = 0;
int r = 0;
int g = 0;
byte n = 0; // next
unsigned long bt = 0;    // break time [sec]
byte wt = 10; // wait time [sec]
int m_w = 1;
int m_z = 2;

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
    bt = millis();
    in = 0;
    in = DigiUSB.read();
    if(n == 0){
      if(in == 115){
        n = 1;
        DigiUSB.println("Start");
      }
    }
    else if(n == 1){
      r = in;
      DigiUSB.print("R:");
      DigiUSB.println(in,DEC);  //
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
    if(n == 0){
      pixels.setPixelColor(0, pixels.Color(r, g, b));
      pixels.show();
    }
  }
  if(millis() - bt > wt * 1000){
    /* loop function */
    // g = g > 255 ? 0 : g+10;
    // if(g > 255){
    //   g = 0;
    // }else{
    //   g += 10;
    // }
    // if(b > 255){
    //   b = 0;
    // }else{
    //   b += 30;
    // }
    // g = getRandom() % 256;
    // b = getRandom() % 256;
    // DigiUSB.print("random:");
    // DigiUSB.println(getRandom());
    b = b==50 ? 0 : 50;
    pixels.setPixelColor(0, pixels.Color(r, g, b));
    pixels.show();
    DigiUSB.delay(3000 - 100);
  }
  DigiUSB.delay(100); // Empirically, 100 is the shortest delay sec
}

int getRandom(){
  m_z = 36969L * (m_z & 65535L) + (m_z >> 16);
  m_w = 18000L * (m_w & 65535L) + (m_w >> 16);
  return (m_z << 16) + m_w;
}
