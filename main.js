'use strict'

// check versions
// console.dir(process.versions)

const {app, BrowserWindow, electron, clipboard} = require('electron')

let win

const fs = require('fs')

const url = require('url')
const qs = require('querystring')

const ds = require('./digispark.js')
let ds_flag


const PORT = 9911
require('http').createServer((req, res) => {
  console.log(req.url)
  let urlObj = url.parse(req.url, true)
  if (urlObj.pathname == "/myscratch.js") {
    fs.readFile(`${__dirname}/myscratch.js`, (err, file) => {
      res.writeHead(200, {"Content-Type": "text/javascript"})
      res.end(file)
    })
  }
  else if (urlObj.pathname == "/blink" && req.method == "POST"){
    let body = ""
    req.on('data', data => {
      body += data;
    })
    req.on('end', () => {
      let q = qs.parse(body)
      let r, g, b
      r = parseInt(q['red'])
      g = parseInt(q['green'])
      b = parseInt(q['blue'])
      // check whether digits or others
      if (typeof r == "number" && typeof g == "number" && typeof b == "number") {
        r = r < 0 ? 0 : r
        g = g < 0 ? 0 : g
        b = b < 0 ? 0 : b

        r = r > 255 ? 255 : r
        g = g > 255 ? 255 : g
        b = b > 255 ? 255 : b

        r = parseInt(r)
        g = parseInt(g)
        b = parseInt(b)

        ds.sendRGB([r, g, b])
        win.webContents.insertCSS(
        "body {background: #" +
                    ("0" + r.toString(16)).slice(-2) +
                    ("0" + g.toString(16)).slice(-2) +
                    ("0" + b.toString(16)).slice(-2) + "}"
        )
      } else {
        console.error("NOT getting value of rgb")
      }
    })
    res.end()
  }
  else {
    res.statusCode = 404
    res.end("Not Found. check URL.")
  }
}).listen(PORT)


function createWindow() {
  win = new BrowserWindow({
    width: 200,
    height: 200,
    title: "scratchX -> DigisparkRGB"
  })

  win.loadURL(`file://${__dirname}/index.html`)
  // win.webContents.openDevTools()

  win.webContents.on('did-finish-load', () => {
    if (ds.getDevice()){
      ds_flag = true
      ds.open()
      win.webContents.executeJavaScript(
        "document.getElementById('ds-status').innerHTML='Digispark<br>CONNECTED'"
      )
      win.webContents.insertCSS("body {background: #2ba6a6}")
      win.webContents.executeJavaScript(
        `document.getElementById('ds-url').innerHTML='URL:<br>'
          + 'http://scratchx.org/?url=http://localhost:${PORT}/myscratch.js'
          + '<br> copied URL to clipboard'`)
      clipboard.writeText(`http://scratchx.org/?url=http://localhost:${PORT}/myscratch.js`)
    } else {
      ds_flag = false
      win.webContents.executeJavaScript(
        "document.getElementById('ds-status').innerHTML='Digispark<br>NOT FOUND'"
      )
      console.log("NOT FOUND Digispark!")
      win.webContents.insertCSS("body {background: #ff4242}")
    }
  })

  win.on('closed', () => {
    if(ds_flag)
      ds.close()
    win = null
  })
}

app.on('ready', createWindow)

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('active', () => {
//   if (win === null) {
//     createWindow()
//   }
// })
