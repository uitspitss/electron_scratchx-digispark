'use strict'

let usb = require('usb')

const USBRQ_HID_SET_REPORT = 0x09
const USB_HID_REPORT_TYPE_FEATURE = 0x03

const VID = 0x16c0
const PID = 0x05df

const reportId = 0
const length = 1

let device = null

exports.getDevice = () => {
  device = usb.findByIds(VID, PID)
  if(device)
    return true
  else
    return false
}

exports.open = () => {
  try{
    device.open()
    console.log("Digispark is opened.")
  }catch(e){
    console.errror(e)
  }
}

exports.close = () => {
  try{
    device.close()
    console.log("Digispark is closed.")
  }catch(e){
    console.error(e)
  }
}

exports.sendRGB = (rgb) => {
  const valueList = [115, rgb[0], rgb[1], rgb[2]]
  let cnt = 0
  for (const value of valueList){
    device.controlTransfer(
      // bmRequestType
      usb.LIBUSB_REQUEST_TYPE_CLASS | usb.LIBUSB_RECIPIENT_DEVICE | usb.LIBUSB_ENDPOINT_OUT,
      // bRequest
      USBRQ_HID_SET_REPORT,
      // wValue
      (USB_HID_REPORT_TYPE_FEATURE << 8) | reportId,
      // wIndex
      value,
      // data_of_length
      new Buffer(length),
      (err, data) => {
        if (err) {
          console.error(err)
        } else {
          switch(cnt){
          case 1:
            process.stdout.write(`R:${value}(${Math.round(value/2.55)}%), `)
            break
          case 2:
            process.stdout.write(`G:${value}(${Math.round(value/2.55)}%), `)
            break
          case 3:
            console.log(`B:${value}(${Math.round(value/2.55)}%)`)
            break
          }
          cnt += 1
        }
      }
    )
  }
}

exports.sendValue = (value) => {
  device.controlTransfer(
    // bmRequestType
    usb.LIBUSB_REQUEST_TYPE_CLASS | usb.LIBUSB_RECIPIENT_DEVICE | usb.LIBUSB_ENDPOINT_OUT,
    // bRequest
    USBRQ_HID_SET_REPORT,
    // wValue
    (USB_HID_REPORT_TYPE_FEATURE << 8) | reportId,
    // wIndex
    value,
    // data_of_length
    new Buffer(length),
    (err, data) => {
      if (err) {
        console.error(err)
        // process.exit(1)
      } else {
        // console.log("ControlTransfer is done.")
      }
    }
  )
}

