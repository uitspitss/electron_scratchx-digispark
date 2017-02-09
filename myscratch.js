'use strict';

(function(ext){
  console.log("ok");

  var device = null;

  ext._deviceConnected = function(dev){
    if(device) return;
    device = dev;
    console.log(device);
    device.open();
  };

  ext._deviceRemoved = function(dev){
    if(device != dev) return;
    device = null;
  };

  ext._shutdown = function(){
    if(device){
      device.close();
    }
    device = null;
  };

  ext._getStatus = function(){
    if(!device) return {status: 1, msg: 'DigiUSB disconnected'};
    return {status: 2, msg: 'DigiUSB connectd'};
  };

  ext.blink = function(red, green, blue){
    $.ajax({
      type: "POST",
      url: "http://localhost:40410/blink",
      dataType: "json",
      data: {
        'red': red,
        'green': green,
        'blue': blue
      },
      success: res => {
        console.log("post successed")
      }
    });
    console.log("red:" + red + " green:" + green + " blue:" + blue);
  };

  ext.blinkWhite = function(white){
    $.ajax({
      type: "POST",
      url: "http://localhost:40410/blink",
      dataType: "json",
      data: {
        'red': white,
        'green': white,
        'blue': white
      },
      success: res => {
        console.log("post successed")
      }
    });
    console.log("red:" + white + " green:" + white + " blue:" + white);
  };

  var descriptor = {
    blocks: [
      ["",  "赤%n, 緑%n, 青%n  で点灯", "blink",
       100, 100, 100],
      ["",  "白%n で点灯", "blinkWhite", 100]
    ],
    menus: {}
  };

  var hid_info = {type: 'hid', vendor: 0x16c0, product: 0x05df};
  console.log(ScratchExtensions.register('DigiUSB', descriptor, ext, hid_info));
})({});

