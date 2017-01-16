# ScrachXからDigiSpark(RGB,LED)を制御するためのプログラム

# 環境
動作確認をした環境は以下の通り

+ macOS 10.12 (Sierra) - 64bit
+ Windows10 - 64bit
+ node.js - 6.1.0

# 使用方法
DigiSpark、node.js側それぞれを下記の通り準備する。  
その前に、Releaseタブからそれぞれの環境に合ったzipをダウンロードして、適当な場所で解凍する。

+ `macOS - 64bit` → `esd-darwin-x64.zip`
+ `Windows - 64bit` → `esd-windows-x64.zip`


## DigiSpark
これは、Windows、macOSで共通。
+ [ArduinoIDE](https://www.arduino.cc/)
+ [digispark:tutorials:connecting [Digistump Wiki]](https://digistump.com/wiki/digispark/tutorials/connecting)

このあたりを見てArduinoIDEからDigisparkにプログラムを書き込めるようにする。

### DigiRGB
+ DigiSparkに`esd_DigiRGB/DigiRGB.ino`を書き込む

### DigiLED
+ DigiSparkに`esd_DigiLED/DigiLED.ino`を書き込む

**ただし、includeされる`DigiUSB.h`の書き換えが必要**

参考: [Incompatibility between digiusb and Adafruit NeoPixel · Issue #4 · digistump/DigisparkExamplePrograms · GitHub](https://github.com/digistump/DigisparkExamplePrograms/issues/4)

macOSでは、`DigiUSB.h`は`/Users/username/Library/Arduino**/packages/digistump/hardware/avr/*.*.*/libraries/DigisparkUSB/DigiUSB.h`にある。`username`、`\*`部分は適宜変更する。


## node.js

### macOS - 64bit
+ DigisparkをUSBに接続する
+ `esd-darwin-x64/esd.app`を実行する

### Windows - 64bit
+ DigisparkをUSBに接続する
+ 適宜、zadigでDigiSparkのUSBドライバを`WinUSB`に変更する(おそらく、不可逆な変更なので**注意**)
+ `node.js - v6.1.0`のexeを[リリース一覧 | Node.js](https://nodejs.org/ja/download/releases/)から拾ってくる。  
  v6.1.0の欄の`ダウンロード` → `win-x64/` → `node.exe`をクリックでダウンロードできる。
+ `node.exe`を`esd-windows-x64`の中に入れる
+ `esd-windows-x64/no-elctron.bat`を実行する


## ScratchX(ウェブブラウザ)
+ 上記のappもしくはプログラムを立ち上げたら、プログラムで表示されているURLにウェブブラウザ(chrome推奨)でアクセスする。
+ ScratchX上で、下図のブロックを実行すると、DigiRGBやDigiLEDのLEDが指定した色で光る。

<<<<<<< HEAD
![esd_block.jpg](images/esd_block.jpg)
=======
[!esd_block.jpg](images/esd_block.jpg)
>>>>>>> b3a0f616db2b8ca84dbc205dbabb2eda2c1a558d
