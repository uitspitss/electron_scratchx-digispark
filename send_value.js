'use strict'

let usb = require('usb')

// const
const USBRQ_HID_SET_REPORT = 0x09;
const USB_HID_REPORT_TYPE_FEATURE = 0x03;

// デバイスのVID,PID
const VID = 0x16c0;
const PID = 0x05df;

let dataValue = parseInt(+process.argv[2]);

let device = usb.findByIds(VID, PID);

if (device) {
  console.log("DigiSpark is found!")
  try {
    device.open();

    var reportId = 0,
        len = 1;
    device.controlTransfer(
      // bmRequestType
      usb.LIBUSB_REQUEST_TYPE_CLASS | usb.LIBUSB_RECIPIENT_DEVICE | usb.LIBUSB_ENDPOINT_OUT,
      // bRequest
      USBRQ_HID_SET_REPORT,
      // wValue
      (USB_HID_REPORT_TYPE_FEATURE << 8) | reportId,
      // wIndex
      dataValue,
      // data_or_length

      new Buffer(len),
      function (err, data) {
        device.close();
        if (err) {
          console.error(err);
          process.exit(1);
        } else {
          console.log("ControlTransfer is done.")
          process.exit(0);
        }
      }
    );
  } catch (e) {
    device.close();
    console.error(e);
    process.exit(1);
  }
} else {
  console.log("DigiSpark is not found!")
}

